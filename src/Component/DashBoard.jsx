import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          background: "white",
          padding: "25px",
          width: "350px",
          border: "1px solid #ccc",
          textAlign: "center"
        }}
      >
        <h2>Dashboard</h2>

        <p><b>Welcome:</b> {user?.username}</p>
        <p><b>Role:</b> {user?.role}</p>

        <br />

        <button
          onClick={() => navigate("/vouchers")}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Go to Vouchers
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          style={{
            width: "100%",
            padding: "8px",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}