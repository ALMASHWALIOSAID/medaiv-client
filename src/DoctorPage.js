import React from "react";
import { Link } from "react-router-dom";
import "./DoctorPage.css";
import { FaUserMd } from "react-icons/fa";
export default function DoctorPage() {
  const doctorInfo = {
    name: "Dr. Ahmed Saleh",
    specialty: "Radiologist",
    contact: "dr.ahmed@example.com",
  };

  return (
    <div className="doctor-page">
      <div className="doctor-container">
        <h2 className="doctor-title">Welcome, {doctorInfo.name}</h2>
        <p className="doctor-specialty">{doctorInfo.specialty}</p>
        <p className="doctor-contact">{doctorInfo.contact}</p>
        <h2>
          Doctor Dashboard <FaUserMd />
        </h2>

        <div className="doctor-actions">
          <Link to="/upload" className="doctor-button">
            Upload New Report
          </Link>
          <Link to="/analyze" className="doctor-button">
            View Analysis
          </Link>
          <Link to="/patients" className="doctor-button">
            Manage Patients
          </Link>
        </div>
      </div>
    </div>
  );
}
