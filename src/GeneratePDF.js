// Create a new PDF document with better text organization
import { jsPDF } from "jspdf";

export default function generatePDF() {
  const pdf = new jsPDF();

  // Title of the report
  pdf.setFont("Arial", "B", 18);
  pdf.text("Medical Analysis Report", 105, 20, { align: "center" });

  // Patient Information Section
  pdf.setFont("Arial", "B", 14);
  pdf.text("Patient Information", 10, 40);
  pdf.setFont("Arial", "", 12);
  pdf.text("Patient Name: Ali Ahmed", 10, 50);
  pdf.text("Date: 2025-04-25", 10, 60);
  pdf.text("Report ID: 00123", 10, 70);

  // Confidence Level Section
  pdf.setFont("Arial", "B", 14);
  pdf.text("Confidence Level", 10, 90);
  pdf.setFont("Arial", "", 12);
  pdf.text("- Confidence: High (95%)", 10, 100);
  pdf.text("- Observations: Minor (5%)", 10, 110);

  // Patient Metrics Section
  pdf.setFont("Arial", "B", 14);
  pdf.text("Patient Metrics", 10, 130);
  pdf.setFont("Arial", "", 12);
  pdf.text("- Blood Pressure: 120/80 mmHg", 10, 140);
  pdf.text("- Heart Rate: 80 BPM", 10, 150);
  pdf.text("- Glucose Level: 95 mg/dL", 10, 160);

  // Diagnosis Section
  pdf.setFont("Arial", "B", 14);
  pdf.text("Diagnosis", 10, 180);
  pdf.setFont("Arial", "", 12);
  pdf.text(
    "No critical issues detected. The patient's vital signs are within the normal range.",
    10,
    190,
    { maxWidth: 180 }
  );

  // Recommendations Section
  pdf.setFont("Arial", "B", 14);
  pdf.text("Recommendations", 10, 210);
  pdf.setFont("Arial", "", 12);
  pdf.text("1. Maintain regular check-ups every 3 months.", 10, 220);
  pdf.text("2. Monitor blood pressure and glucose level regularly.", 10, 230);
  pdf.text(
    "3. Follow a balanced diet and maintain physical activity.",
    10,
    240
  );

  // Footer for doctor signature
  pdf.setFont("Arial", "", 12);
  pdf.text("Doctor: Dr. Ahmed Saleh", 10, 260);
  pdf.text("Signature: ____________________", 10, 270);

  // Save the organized PDF file
  pdf.save("Organized_Medical_Report.pdf");
}
