import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { saveAuth } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await api.post("/api/auth/login", form);

      // ✅ Save token + role
      saveAuth(res.data.token, res.data.role);

      // ✅ Always go to Landing: it will redirect (admin/user)
      navigate("/");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-blue">
        <h1>Login</h1>
        <p>Welcome back to GymFit Pro</p>
      </div>

      <div className="container">
        {msg && (
          <div className="alert alert-warning">
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>{msg}</div>
          </div>
        )}

        <div className="card">
          <h2 className="card-title">Sign In</h2>

          <form onSubmit={submit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button className="btn btn-primary" style={{ width: "100%" }}>
              Login
            </button>
          </form>

          <p className="text-gray" style={{ marginTop: "1rem", textAlign: "center" }}>
            Don’t have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

