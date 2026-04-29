import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Vouchers() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("vouchers")) || []
  );

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    let data = JSON.parse(localStorage.getItem("vouchers")) || [];

    const updated = data.filter((item) => item.id !== id);

    localStorage.setItem("vouchers", JSON.stringify(updated));
    setList(updated);

    alert("Deleted successfully");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Voucher List</h2>

        <button
          onClick={() => navigate("/create-voucher")}
          style={{
            padding: "8px 12px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          + Create
        </button>
      </div>

      <br />

      {/* Table */}
      <table border="1" width="100%" style={{ textAlign: "center" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Narration</th>
            <th>Total Debit</th>
            <th>Total Credit</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: "10px", color: "red" }}>
                No Data Found
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.narration}</td>
                <td>{item.totalDebit}</td>
                <td>{item.totalCredit}</td>

                <td>
                  <button style={{ marginRight: "5px" }}>
                    Read
                  </button>

                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() => navigate(`/edit-voucher/${item.id}`)}
                        style={{ marginRight: "5px" }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ background: "red", color: "white" }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}