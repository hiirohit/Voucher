import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    const ok = login(username, password);

    if (ok) {
      navigate("/dashboard");
    } else {
      alert("Wrong username or password");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2"
      }}
    >
      <div
        style={{
          padding: "25px",
          background: "white",
          border: "1px solid #ccc",
          width: "300px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <div style={{ marginBottom: "10px" }}>
          <label>Username</label><br />
          <input
            style={{ width: "100%", padding: "6px" }}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label><br />
          <input
            type="password"
            style={{ width: "100%", padding: "6px" }}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "8px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <p style={{ fontSize: "12px", marginTop: "10px", color: "gray" }}>
          admin / admin123 <br />
          staff / staff123
        </p>
      </div>
    </div>
  );
}