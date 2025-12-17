const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

/* ---------------- USERS ---------------- */

// list users (full details)
router.get("/users", auth, adminOnly, async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id,name,email,role,created_at,updated_at FROM users ORDER BY created_at DESC"
  );
  res.json(rows);
});

// admin creates USER account (not admin)
router.post("/users", auth, adminOnly, async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const [existing] = await pool.query("SELECT id FROM users WHERE email=?", [email]);
  if (existing.length) return res.status(409).json({ message: "Email already exists" });

  const password_hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,'user')",
    [name, email, password_hash]
  );

  res.status(201).json({ message: "User created", id: result.insertId });
});

// admin deletes user + their logs
router.delete("/users/:id", auth, adminOnly, async (req, res) => {
  const id = Number(req.params.id);

  await pool.query("DELETE FROM fitness_logs WHERE user_id=?", [id]);
  const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);

  if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
});

/* ------------- CREATE ADMIN (admin only) ------------- */
router.post("/create-admin", auth, adminOnly, async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const [existing] = await pool.query("SELECT id FROM users WHERE email=?", [email]);
  if (existing.length) return res.status(409).json({ message: "Email already exists" });

  const password_hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,'admin')",
    [name, email, password_hash]
  );

  res.status(201).json({ message: "Admin created", id: result.insertId });
});

/* ---------------- LOGS ---------------- */

router.get("/logs", auth, adminOnly, async (req, res) => {
  const [rows] = await pool.query(`
    SELECT l.*, u.email
    FROM fitness_logs l
    JOIN users u ON u.id = l.user_id
    ORDER BY l.created_at DESC
  `);
  res.json(rows);
});

router.delete("/logs/:id", auth, adminOnly, async (req, res) => {
  const id = Number(req.params.id);
  const [r] = await pool.query("DELETE FROM fitness_logs WHERE id=?", [id]);
  if (r.affectedRows === 0) return res.status(404).json({ message: "Log not found" });
  res.json({ message: "Log deleted" });
});

/* ---------------- EXERCISES (CRUD) ---------------- */

router.get("/exercises", auth, adminOnly, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM exercises ORDER BY created_at DESC");
  res.json(rows);
});

router.post("/exercises", auth, adminOnly, async (req, res) => {
  const { name, muscle_group, equipment, difficulty, instructions } = req.body || {};
  if (!name || !muscle_group) return res.status(400).json({ message: "Name and muscle_group required" });

  const [result] = await pool.query(
    `INSERT INTO exercises (name, muscle_group, equipment, difficulty, instructions)
     VALUES (?, ?, ?, ?, ?)`,
    [name, muscle_group, equipment || "Bodyweight", difficulty || "beginner", instructions || ""]
  );

  res.status(201).json({ message: "Exercise created", id: result.insertId });
});

router.put("/exercises/:id", auth, adminOnly, async (req, res) => {
  const id = Number(req.params.id);
  const { name, muscle_group, equipment, difficulty, instructions } = req.body || {};

  const [r] = await pool.query(
    `UPDATE exercises
     SET name=?, muscle_group=?, equipment=?, difficulty=?, instructions=?
     WHERE id=?`,
    [name, muscle_group, equipment, difficulty, instructions, id]
  );

  if (r.affectedRows === 0) return res.status(404).json({ message: "Exercise not found" });
  res.json({ message: "Exercise updated" });
});

router.delete("/exercises/:id", auth, adminOnly, async (req, res) => {
  const id = Number(req.params.id);
  const [r] = await pool.query("DELETE FROM exercises WHERE id=?", [id]);
  if (r.affectedRows === 0) return res.status(404).json({ message: "Exercise not found" });
  res.json({ message: "Exercise deleted" });
});

module.exports = router;
