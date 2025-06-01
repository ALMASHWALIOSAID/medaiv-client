import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./medaiv-logo.png.png";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/signup", {
        username,
        password,
      });
      setMessage(`Account created for ${username}`);
      navigate("/login");
    } catch (err) {
      setMessage(
        "Signup failed: " + (err.response?.data?.detail || "Unknown error")
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="MedAIV Logo" className="login-logo" />
        <h2 className="login-title">Create Your MedAIV Account</h2>
        <form onSubmit={handleSignUp} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {message && <p className="login-error">{message}</p>}
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
