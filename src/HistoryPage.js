// ✅ HistoryPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HistoryPage.css";

export default function PatientHistoryPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="history-container">
      <h2 className="history-title">My Report History</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="report-list">
          {reports.map((report) => (
            <li key={report.id} className="report-item">
              <strong>{report.filename}</strong> <br />
              <span>
                Uploaded: {new Date(report.created_at).toLocaleString()}
              </span>
              <br />
              <Link to={`/analyze/${report.id}`} className="view-link">
                View Analysis
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
