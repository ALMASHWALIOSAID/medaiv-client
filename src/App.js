import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import HomePage from "./HomePage";
import LoginPage from "./Login";
import DoctorPage from "./DoctorPage";
import AdminPage from "./AdminPage";
import UploadReportPage from "./UploadReportPage";
import AnalyzeResultPage from "./AnalyzeResultPage";
import MyReportsPage from "./MyReportsPage";
import NotFoundPage from "./NotFoundPage";
import SignUpPage from "./SignUpPage";
import PatientPage from "./PatientPage";
import HistoryPage from "./HistoryPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadReportPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-reports"
          element={
            <PrivateRoute>
              <MyReportsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/analyze/:reportId"
          element={
            <PrivateRoute>
              <AnalyzeResultPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <PrivateRoute requiredRole="doctor">
              <DoctorPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient"
          element={
            <PrivateRoute>
              <PatientPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
