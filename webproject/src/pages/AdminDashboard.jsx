import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { logout } from "../utils/auth";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("users"); // users | exercises | logs
  const [msg, setMsg] = useState("");

  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });

  const [newEx, setNewEx] = useState({
    name: "",
    muscle_group: "",
    equipment: "Bodyweight",
    difficulty: "beginner",
    instructions: ""
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const load = async () => {
    setMsg("");
    try {
      const [u, l, e] = await Promise.all([
        api.get("/api/admin/users"),
        api.get("/api/admin/logs"),
        api.get("/api/admin/exercises")
      ]);
      setUsers(u.data);
      setLogs(l.data);
      setExercises(e.data);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Admin access only.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ---------------- USERS ---------------- */
  const createUser = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/api/admin/users", newUser);
      setNewUser({ name: "", email: "", password: "" });
      setMsg("User created ✅");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Create user failed");
    }
  };

  const deleteUser = async (id) => {
    setMsg("");
    try {
      await api.delete(`/api/admin/users/${id}`);
      setMsg("User deleted ✅");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Delete user failed");
    }
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/api/admin/create-admin", newAdmin);
      setNewAdmin({ name: "", email: "", password: "" });
      setMsg("Admin created ✅");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Create admin failed");
    }
  };

  /* ---------------- LOGS ---------------- */
  const deleteLog = async (id) => {
    setMsg("");
    try {
      await api.delete(`/api/admin/logs/${id}`);
      setMsg("Log deleted ✅");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Delete log failed");
    }
  };

  /* -------------- EXERCISES -------------- */
  const createExercise = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/api/admin/exercises", newEx);
      setNewEx({
        name: "",
        muscle_group: "",
        equipment: "Bodyweight",
        difficulty: "beginner",
        instructions: ""
      });
      setMsg("Exercise added ✅");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Add exercise failed");
    }
  };

  const deleteExercise = async (id) => {
    setMsg("");
    try {
      await api.delete(`/api/admin/exercises/${id}`);
      setMsg("Exercise deleted ✅");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Delete exercise failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-cyan" style={{ position: "relative" }}>
        <h1>Admin Dashboard</h1>
        <p>Full control: users, exercises, and all logs</p>

        <button
          className="btn btn-secondary"
          onClick={handleLogout}
          style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}
        >
          Logout
        </button>
      </div>

      <div className="container">
        {msg && (
          <div className="alert alert-warning">
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>{msg}</div>
          </div>
        )}

        {/* Tabs */}
        <div className="card">
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              className={`btn ${tab === "users" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setTab("users")}
              style={{ flex: 1 }}
            >
              Users
            </button>
            <button
              className={`btn ${tab === "exercises" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setTab("exercises")}
              style={{ flex: 1 }}
            >
              Exercises
            </button>
            <button
              className={`btn ${tab === "logs" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setTab("logs")}
              style={{ flex: 1 }}
            >
              Logs
            </button>
          </div>
        </div>

        {/* USERS TAB */}
        {tab === "users" && (
          <>
            <div className="card">
              <h2 className="card-title">Create User</h2>
              <form onSubmit={createUser} className="grid grid-3">
                <input
                  className="form-input"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
                <button className="btn btn-primary" style={{ gridColumn: "1 / -1" }}>
                  Create User
                </button>
              </form>
              <p className="text-gray" style={{ marginTop: "0.75rem" }}>
                Users created here will always have role <b>user</b>.
              </p>
            </div>

            <div className="card">
              <h2 className="card-title">Create Admin</h2>
              <form onSubmit={createAdmin} className="grid grid-3">
                <input
                  className="form-input"
                  placeholder="Name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Password"
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  required
                />
                <button className="btn btn-primary" style={{ gridColumn: "1 / -1" }}>
                  Create Admin
                </button>
              </form>
            </div>

            <div className="card">
              <h2 className="card-title">All Users</h2>
              <p className="text-gray">Total: {users.length}</p>

              <div style={{ overflowX: "auto" }}>
                <table border="1" width="100%" style={{ borderColor: "#334155" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>{new Date(u.created_at).toLocaleString()}</td>
                        <td>{new Date(u.updated_at).toLocaleString()}</td>
                        <td>
                          <button className="btn btn-secondary" onClick={() => deleteUser(u.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* EXERCISES TAB */}
        {tab === "exercises" && (
          <>
            <div className="card">
              <h2 className="card-title">Add Exercise</h2>

              <form onSubmit={createExercise}>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Exercise Name</label>
                    <input
                      className="form-input"
                      value={newEx.name}
                      onChange={(e) => setNewEx({ ...newEx, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Muscle Group</label>
                    <input
                      className="form-input"
                      value={newEx.muscle_group}
                      onChange={(e) => setNewEx({ ...newEx, muscle_group: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Equipment</label>
                    <input
                      className="form-input"
                      value={newEx.equipment}
                      onChange={(e) => setNewEx({ ...newEx, equipment: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select
                      className="form-select"
                      value={newEx.difficulty}
                      onChange={(e) => setNewEx({ ...newEx, difficulty: e.target.value })}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Instructions</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    value={newEx.instructions}
                    onChange={(e) => setNewEx({ ...newEx, instructions: e.target.value })}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: "100%" }}>
                  Add Exercise
                </button>
              </form>
            </div>

            <div className="card">
              <h2 className="card-title">All Exercises</h2>
              <p className="text-gray">Total: {exercises.length}</p>

              <div style={{ overflowX: "auto" }}>
                <table border="1" width="100%" style={{ borderColor: "#334155" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Muscle Group</th>
                      <th>Equipment</th>
                      <th>Difficulty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercises.map((ex) => (
                      <tr key={ex.id}>
                        <td>{ex.id}</td>
                        <td>{ex.name}</td>
                        <td>{ex.muscle_group}</td>
                        <td>{ex.equipment}</td>
                        <td>{ex.difficulty}</td>
                        <td>
                          <button className="btn btn-secondary" onClick={() => deleteExercise(ex.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* LOGS TAB */}
        {tab === "logs" && (
          <div className="card">
            <h2 className="card-title">All Logs</h2>
            <p className="text-gray">Total: {logs.length}</p>

            <div style={{ overflowX: "auto" }}>
              <table border="1" width="100%" style={{ borderColor: "#334155" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User Email</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((l) => (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>{l.email}</td>
                      <td>{l.log_type}</td>
                      <td>{new Date(l.created_at).toLocaleString()}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => deleteLog(l.id)}>
                          Delete
                        </button>
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
