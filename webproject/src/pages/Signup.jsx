import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // ✅ backend forces role='user'
      await api.post("/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-blue">
        <h1>Register</h1>
        <p>Create a user account</p>
      </div>

      <div className="container">
        <div className="card">
          <h2 className="card-title">Signup</h2>

          {msg && (
            <div className="alert alert-warning">
              <span style={{ fontSize: "1.5rem" }}>⚠️</span>
              <div>{msg}</div>
            </div>
          )}

          <form onSubmit={submit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" name="name" value={form.name} onChange={onChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" name="email" value={form.email} onChange={onChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" name="password" value={form.password} onChange={onChange} required />
            </div>

            <button className="btn btn-primary" style={{ width: "100%" }}>Create Account</button>
          </form>

          <p className="text-gray" style={{ marginTop: "1rem" }}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
