import React, { useState } from "react";
import { FaUpload, FaFilePdf } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./UploadReport.css";

export default function UploadReportPage() {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [mode, setMode] = useState("upload");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setMessage("");

    const previews = selectedFiles.map((file) =>
      file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    );
    setFilePreviews(previews);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    if (mode === "upload" && files.length > 0) {
      const form = new FormData();
      form.append("file", files[0]);

      setUploading(true);
      setMessage("Uploading to server…");

      try {
        const res = await fetch("http://127.0.0.1:8000/api/reports/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ DO NOT manually set Content-Type here!
          },
          body: form,
        });

        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        navigate(`/analyze/${data.id}`);
      } catch (err) {
        console.error("Upload failed:", err);
        setMessage("Upload failed: " + (err.message || "Unknown error"));
        setUploading(false);
      }
    } else if (mode === "url" && url) {
      setMessage(`URL submitted: ${url}`);
    } else {
      setMessage("Please select a file or enter a URL.");
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2 className="upload-title">Upload Your Medical Reports</h2>

        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "upload" ? "active" : ""}`}
            onClick={() => setMode("upload")}
          >
            Upload
          </button>
          <button
            className={`mode-btn ${mode === "url" ? "active" : ""}`}
            onClick={() => setMode("url")}
          >
            URL
          </button>
        </div>

        <form onSubmit={handleUpload} className="upload-form">
          {mode === "upload" ? (
            <>
              <label htmlFor="file-upload" className="drop-zone">
                <FaUpload size={40} color="#0a192f" />
                <p>
                  Drag and drop files here, or click to select multiple files.
                </p>
                <p className="file-info">Supported formats: PDF, JPEG, PNG</p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={handleFileChange}
                  hidden
                />
              </label>

              {files.length > 0 && (
                <div className="preview-box-multiple">
                  {files.map((file, index) => (
                    <div key={index} className="single-preview">
                      {file.type.startsWith("image/") && filePreviews[index] ? (
                        <img
                          src={filePreviews[index]}
                          alt="Preview"
                          className="file-preview"
                        />
                      ) : (
                        <div className="pdf-preview">
                          <FaFilePdf size={40} color="#0a192f" />
                          <p>{file.name}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <input
              type="url"
              placeholder="Enter the report URL..."
              className="url-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          )}

          <button type="submit" className="analyze-btn">
            {uploading ? "Uploading..." : "Analyze Reports"}
          </button>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </form>

        {message && <p className="upload-message">{message}</p>}
      </div>
    </div>
  );
}
