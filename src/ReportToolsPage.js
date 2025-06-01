import React from "react";
import { Link } from "react-router-dom";
import "./ReportToolsPage.css";

export default function ReportToolsPage() {
  return (
    <div className="reporttools-page">
      <div className="reporttools-container">
        <h2 className="reporttools-title">Report Tools</h2>
        <p className="reporttools-subtitle">
          Access powerful tools for analyzing and managing reports.
        </p>

        <div className="reporttools-actions">
          <Link to="/upload" className="reporttools-button">
            Start New Analysis
          </Link>
          <Link to="/analyze" className="reporttools-button">
            View Analysis
          </Link>
          <Link to="/" className="reporttools-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
