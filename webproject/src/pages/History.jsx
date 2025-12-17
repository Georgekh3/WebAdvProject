import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function History() {
  const [logs, setLogs] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setMsg("");
    try {
      const res = await api.get("/api/logs");
      setLogs(res.data);
    } catch {
      setMsg("Failed to load logs.");
    }
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    setMsg("");
    try {
      await api.delete(`/api/logs/${id}`);
      setLogs((prev) => prev.filter((x) => x.id !== id));
    } catch {
      setMsg("Delete failed.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-purple">
        <h1>My Saved Results</h1>
        <p>Your saved BMI and workout logs</p>
      </div>

      <div className="container">
        {msg && (
          <div className="alert alert-warning">
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>{msg}</div>
          </div>
        )}

        {!logs.length ? (
          <div className="card text-center" style={{ padding: "3rem" }}>
            <p className="text-gray">No saved results yet.</p>
          </div>
        ) : (
          <div className="card">
            <h2 className="card-title">Logs</h2>

            <div style={{ overflowX: "auto" }}>
              <table border="1" width="100%" style={{ borderColor: "#334155" }}>
                <thead>
                  <tr><th>Type</th><th>Date</th><th>Summary</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {logs.map((l) => (
                    <tr key={l.id}>
                      <td>{l.log_type}</td>
                      <td>{new Date(l.created_at).toLocaleString()}</td>
                      <td>
                        {l.log_type === "BMI"
                          ? `BMI: ${l.bmi} | TDEE: ${l.tdee}`
                          : `Burn: ${l.calories_burned} kcal | Water: ${l.water_ml} ml`}
                      </td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => del(l.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
