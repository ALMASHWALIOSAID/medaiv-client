import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link to="/" style={styles.homeLink}>
        ← Go back to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "100px 20px",
    color: "#0a192f",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  homeLink: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#0077b6",
    textDecoration: "none",
  },
};
