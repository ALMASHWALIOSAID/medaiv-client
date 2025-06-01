import React from "react";
import { Link } from "react-router-dom";
import "./ManagePatientsPage.css";

export default function ManagePatientsPage() {
  const patients = [
    {
      id: 1,
      name: "Ali Ahmed",
      age: 45,
      status: "Under Review",
      lastReport: "2025-04-25",
    },
    {
      id: 2,
      name: "Sara Yassin",
      age: 29,
      status: "Completed",
      lastReport: "2025-04-20",
    },
    {
      id: 3,
      name: "Mohammed Khaled",
      age: 53,
      status: "Pending",
      lastReport: "2025-04-23",
    },
  ];

  return (
    <div className="patients-page">
      <div className="patients-container">
        <h2 className="patients-title">Manage Patients</h2>

        <table className="patients-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
              <th>Last Report</th>
              <th>Action</th> {/* عمود جديد للزر */}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.status}</td>
                <td>{patient.lastReport}</td>
                <td>
                  <Link
                    to={`/patient/${patient.id}`}
                    className="view-report-btn"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="patients-actions">
          <Link to="/" className="patients-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
