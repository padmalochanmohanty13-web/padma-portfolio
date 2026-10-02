import { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();

const DEFAULT_RESUME = {
  url: "/resume.pdf",
  name: "Padmalochan_Mohanty_Resume.pdf",
  size: "Standard PDF",
  uploadDate: "Default CV",
  isCustom: false,
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem("padma_custom_resume_meta");
      const savedDataUrl = localStorage.getItem("padma_custom_resume_data");
      if (saved && savedDataUrl) {
        const meta = JSON.parse(saved);
        return {
          ...meta,
          url: savedDataUrl,
          isCustom: true,
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_RESUME;
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const downloadResume = () => {
    try {
      const link = document.createElement("a");
      link.href = resumeData.url;
      link.download = resumeData.name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification(`Downloading ${resumeData.name}...`, "info");
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback
      window.open(resumeData.url, "_blank");
    }
  };

  const uploadResume = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }

      // Check file size (max 8MB)
      if (file.size > 8 * 1024 * 1024) {
        showNotification("File size exceeds 8MB limit. Please choose a smaller PDF.", "error");
        reject(new Error("File too large"));
        return;
      }

      // Format size
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result;
        const newMeta = {
          url: dataUrl,
          name: file.name,
          size: sizeStr,
          uploadDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          isCustom: true,
        };

        setResumeData(newMeta);

        try {
          localStorage.setItem("padma_custom_resume_meta", JSON.stringify({
            name: newMeta.name,
            size: newMeta.size,
            uploadDate: newMeta.uploadDate,
          }));
          localStorage.setItem("padma_custom_resume_data", dataUrl);
        } catch (e) {
          console.warn("Could not save to localStorage (likely quota exceeded):", e);
        }

        showNotification("New resume uploaded & set as active successfully!", "success");
        resolve(newMeta);
      };

      reader.onerror = (err) => {
        showNotification("Failed to read the file. Please try again.", "error");
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  const resetResume = () => {
    setResumeData(DEFAULT_RESUME);
    try {
      localStorage.removeItem("padma_custom_resume_meta");
      localStorage.removeItem("padma_custom_resume_data");
    } catch {
      // ignore
    }
    showNotification("Reset to original official resume.", "info");
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        downloadResume,
        uploadResume,
        resetResume,
        previewOpen,
        setPreviewOpen,
        notification,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
