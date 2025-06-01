import React from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";

export default function AdminPage() {
  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2 className="admin-title">Welcome to Admin Dashboard</h2>
        <p className="admin-subtitle">
          Manage users, reports, and system settings.
        </p>

        <div className="admin-actions">
          <Link to="/manage-users" className="admin-button">
            Manage Users
          </Link>
          <Link to="/manage-reports" className="admin-button">
            Manage Reports
          </Link>
          <Link to="/" className="admin-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
