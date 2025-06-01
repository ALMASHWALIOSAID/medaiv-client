import React from "react";
import "./App.css";
import logo from "./medaiv-logo.png.png";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  FaUserMd,
  FaUserInjured,
  FaUserShield,
  FaFileMedical,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home">
      <header className="main-header layout-style">
        <div className="header-content new-layout" style={styles.headerContent}>
          <div className="logo-bar" style={styles.logoBar}>
            <img src={logo} alt="MedAIV Logo" style={styles.logoImage} />
            <h1 style={styles.title}>MedAIV</h1>
          </div>
        </div>

        <div className="nav-bar-wrapper" style={styles.navBarWrapper}>
          <nav className="nav-bar-wide" style={styles.navBar}>
            <div style={styles.innerNav}>
              <a href="#home" style={styles.link}>
                Home
              </a>
              <a href="#about" style={styles.link}>
                About
              </a>
              <a href="#products" style={styles.link}>
                Products
              </a>
              <a href="#news" style={styles.link}>
                News
              </a>
              <a href="#contact" style={styles.link}>
                Info/Contact
              </a>

              <div className="search-bar" style={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search"
                  style={styles.searchInput}
                />
                <button style={styles.searchButton}>
                  <FaSearch />
                </button>
              </div>

              {!token ? (
                <>
                  <Link to="/login" style={styles.authLink}>
                    <FaSignInAlt /> Login
                  </Link>
                  <Link to="/signup" style={styles.authLink}>
                    <FaUserPlus /> Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  style={{
                    ...styles.authLink,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <h2 className="hero-title">Medical AI Report Analysis</h2>
        <p className="hero-text">
          Extract, analyze, and visualize medical documents using OCR & NLP.
        </p>
      </section>

      <section className="blue-feature-strip">
        <div className="feature-box">Diagnosis</div>
        <Link
          to="/upload"
          className="feature-box"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Reports
        </Link>
        <div className="feature-box">AI Analysis</div>
        <div className="feature-box">Security</div>
        <div className="feature-box">Support</div>
      </section>

      <section className="info-section">
        <Link
          to="/upload"
          className="info-item"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>Upload Report</h3>
          <p>Send in medical scans or documents for analysis.</p>
        </Link>
        <div className="info-item">
          <h3>AI Review</h3>
          <p>Instantly get structured insight powered by MedAIV.</p>
        </div>
        <div className="info-item">
          <h3>Visual Dashboard</h3>
          <p>See charts, summaries, and suggestions.</p>
        </div>
      </section>

      <section className="icon-row">
        <Link to="/doctor" className="icon-box">
          <FaUserMd size={24} style={{ marginRight: "8px" }} />
          Doctor
        </Link>
        <Link to="/patient" className="icon-box">
          <FaUserInjured size={24} style={{ marginRight: "8px" }} />
          Patient
        </Link>
        <Link to="/admin" className="icon-box">
          <FaUserShield size={24} style={{ marginRight: "8px" }} />
          Admin
        </Link>
        <Link to="/report-tools" className="icon-box">
          <FaFileMedical size={24} style={{ marginRight: "8px" }} />
          Report Tools
        </Link>
        <Link to="/my-reports" className="icon-box">
          <FaFileMedical size={24} style={{ marginRight: "8px" }} />
          My Reports
        </Link>
      </section>

      <footer className="footer">
        <p>© 2025 MedAIV — All rights reserved</p>
        <p>info@medaiv.ai</p>
      </footer>
    </div>
  );
}

const styles = {
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 40px",
  },
  logoBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoImage: {
    height: "50px",
  },
  title: {
    color: "#0077b6",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  navBarWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  navBar: {
    backgroundColor: "#0077b6",
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: "10px 20px",
    width: "90%",
    transform: "skewX(20deg)",
    flexWrap: "wrap",
  },
  innerNav: {
    transform: "skewX(-20deg)",
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: "10px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    fontWeight: "bold",
  },
  searchBar: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  searchInput: {
    padding: "5px",
    borderRadius: "4px",
    border: "none",
  },
  searchButton: {
    background: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "5px",
  },
  authLink: {
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    fontWeight: "bold",
  },
};
