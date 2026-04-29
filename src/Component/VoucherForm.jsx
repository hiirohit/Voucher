import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VoucherForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [voucherType, setVoucherType] = useState("Payment");
  const [narration, setNarration] = useState("On Account");

  const [rows, setRows] = useState([
    { account: "", amount: "", tdsApplicable: "No", tdsType: "" }
  ]);

  useEffect(() => {
    if (id) {
      const data = JSON.parse(localStorage.getItem("vouchers")) || [];
      const found = data.find((item) => item.id === Number(id));

      if (found) {
        setVoucherType(found.type);
        setNarration(found.narration);
      }
    }
  }, [id]);

  function handleChange(index, field, value) {
    const copy = [...rows];
    copy[index][field] = value;

    if (field === "tdsApplicable" && value === "No") {
      copy[index].tdsType = "";
    }

    setRows(copy);
  }

  function addRow() {
    setRows([
      ...rows,
      { account: "", amount: "", tdsApplicable: "No", tdsType: "" }
    ]);
  }

  function deleteRow(index) {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  }

  function handleSubmit() {
    let total = 0;

    rows.forEach((item) => {
      total += Number(item.amount || 0);
    });

    let data = JSON.parse(localStorage.getItem("vouchers")) || [];

    if (id) {
      const updated = data.map((item) => {
        if (item.id === Number(id)) {
          return {
            ...item,
            type: voucherType,
            narration: narration,
            totalDebit: voucherType === "Payment" ? total : 0,
            totalCredit: voucherType === "Received" ? total : 0
          };
        }
        return item;
      });

      localStorage.setItem("vouchers", JSON.stringify(updated));
      alert("Voucher updated successfully");
    } else {
      const newVoucher = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: voucherType,
        narration: narration,
        totalDebit: voucherType === "Payment" ? total : 0,
        totalCredit: voucherType === "Received" ? total : 0
      };

      localStorage.setItem(
        "vouchers",
        JSON.stringify([...data, newVoucher])
      );

      alert("Voucher created successfully");
    }

    navigate("/vouchers");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      
      <h2 style={{ textAlign: "center" }}>
        {id ? "Edit Voucher" : "Create Voucher"}
      </h2>

      {/* Voucher Type */}
      <div style={{ marginBottom: "10px" }}>
        <label>Voucher Type</label><br />
        <select
          value={voucherType}
          onChange={(e) => setVoucherType(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        >
          <option>Payment</option>
          <option>Received</option>
        </select>
      </div>

      {/* Narration */}
      <div style={{ marginBottom: "15px" }}>
        <label>Narration</label><br />
        <input
          value={narration}
          onFocus={() => setNarration("")}
          onChange={(e) => setNarration(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      {/* Table */}
      <table border="1" width="100%" style={{ textAlign: "center" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Account</th>
            <th>Amount</th>
            <th>TDS</th>
            <th>TDS Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  value={row.account}
                  onChange={(e) =>
                    handleChange(index, "account", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option>Cash</option>
                  <option>Bank</option>
                </select>
              </td>

              <td>
                <input
                  type="number"
                  value={row.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                />
              </td>

              <td>
                <select
                  value={row.tdsApplicable}
                  onChange={(e) =>
                    handleChange(index, "tdsApplicable", e.target.value)
                  }
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </td>

              <td>
                {row.tdsApplicable === "Yes" && (
                  <select
                    value={row.tdsType}
                    onChange={(e) =>
                      handleChange(index, "tdsType", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option>Type A</option>
                    <option>Type B</option>
                  </select>
                )}
              </td>

              <td>
                <button style={{ marginRight: "5px" }} onClick={addRow}>
                  +
                </button>

                {rows.length > 1 && (
                  <button onClick={() => deleteRow(index)}>
                    x
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
    </div>
  );
}