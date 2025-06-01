import React from "react";
import { useParams, Link } from "react-router-dom";
import "./PatientReportPage.css";

export default function PatientReportPage() {
  const { id } = useParams(); // قراءة رقم المريض من الرابط

  return (
    <div className="report-page">
      <div className="report-container">
        <h2 className="report-title">Patient Report - ID {id}</h2>
        <p className="report-subtitle">
          Here you can view all reports for patient #{id}.
        </p>

        {/* لاحقًا يمكنك عرض تقارير حقيقية حسب ID */}

        <div className="report-actions">
          <Link to="/patients" className="report-button">
            Back to Patients
          </Link>
        </div>
      </div>
    </div>
  );
}
