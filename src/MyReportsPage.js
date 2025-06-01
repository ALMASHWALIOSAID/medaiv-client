import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MyReportsPage.css";

export default function MyReportsPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/reports/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setReports(res.data))
      .catch((err) => {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports. Please try again.");
      });
  }, [navigate]);

  return (
    <div className="reports-page">
      <h2 className="page-title">📁 My Medical Reports</h2>

      {error && <p className="error-message">{error}</p>}

      {reports.length === 0 && !error ? (
        <p className="no-reports-msg">
          No reports found. <Link to="/upload">Upload one here</Link>.
        </p>
      ) : (
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <h3 className="report-title">{report.filename}</h3>
              <p className="report-date">
                Uploaded on{" "}
                {new Date(report.created_at || Date.now()).toLocaleDateString()}
              </p>
              <Link to={`/analyze/${report.id}`} className="analyze-link">
                View Analysis ➜
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
