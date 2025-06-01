import React, { useRef, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./AnalyzeResult.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AnalyzeResultPage() {
  const reportRef = useRef(null);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const { reportId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReport(res.data))
      .catch((err) => {
        console.error("Failed to fetch report:", err);
        setError("Failed to load report.");
      });
  }, [reportId, navigate]);

  if (error) return <div className="error">{error}</div>;
  if (!report) return <div>Loading...</div>;

  const pieData = {
    labels: ["Confidence", "Other"],
    datasets: [
      {
        label: "Report Confidence",
        data: [report.confidence || 0, 100 - (report.confidence || 0)],
        backgroundColor: ["#0a192f", "#66bb6a"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Blood Pressure", "Heart Rate", "Glucose Level"],
    datasets: [
      {
        label: "Patient Metrics",
        data: [
          report.entities?.blood_pressure || 0,
          report.entities?.heart_rate || 0,
          report.entities?.glucose_level || 0,
        ],
        backgroundColor: ["#0a192f", "#66bb6a", "#ff9800"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      doc.setFontSize(18);
      doc.text(
        "Medical Analysis Report",
        doc.internal.pageSize.getWidth() / 2,
        30,
        { align: "center" }
      );
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth() - 40;
      const imgProps = doc.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, "PNG", 20, 60, pdfWidth, pdfHeight);
      doc.save("Medical_Report.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="analyze-page">
      <div className="analyze-container" ref={reportRef}>
        <h2 className="analyze-title">Analysis Report</h2>

        <div className="patient-info">
          <p>
            <strong>Patient Name:</strong> {report.patient_name || "N/A"}
          </p>
          <p>
            <strong>Date:</strong> {report.date || "N/A"}
          </p>
          <p>
            <strong>Report ID:</strong> {report.id}
          </p>
        </div>

        <div className="chart-container">
          <h3>Confidence Level</h3>
          <Pie
            data={pieData}
            options={{ maintainAspectRatio: false }}
            height={200}
          />
        </div>

        <div className="chart-container">
          <h3>Patient Metrics</h3>
          <Bar
            data={barData}
            options={{ maintainAspectRatio: false }}
            height={200}
          />
        </div>

        <div className="entity-summary">
          <h3>Extracted Metrics</h3>
          <div className="entity-cards">
            <div className="entity-card">
              <p>
                <strong>Blood Pressure:</strong>
              </p>
              <p>{report.entities?.blood_pressure || "N/A"}</p>
            </div>
            <div className="entity-card">
              <p>
                <strong>Heart Rate:</strong>
              </p>
              <p>{report.entities?.heart_rate || "N/A"}</p>
            </div>
            <div className="entity-card">
              <p>
                <strong>Glucose Level:</strong>
              </p>
              <p>{report.entities?.glucose_level || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="summary-cards">
          <div className="card">
            <h3>Diagnosis</h3>
            <p>{report.diagnosis || "No critical issues detected."}</p>
          </div>
          <div className="card">
            <h3>Confidence Level</h3>
            <p>{report.confidence || 0}%</p>
          </div>
          <div className="card">
            <h3>Recommendations</h3>
            <p>{report.recommendations || "Regular follow-up is advised."}</p>
          </div>
        </div>
      </div>

      <div className="export-actions">
        <button className="export-button" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

      <div className="result-actions">
        <Link to="/upload" className="result-button">
          Analyze Another Report
        </Link>
        <Link to="/" className="result-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
