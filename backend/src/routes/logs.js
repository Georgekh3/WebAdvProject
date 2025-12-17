const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE log (save BMI or WORKOUT result)
router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const p = req.body || {};
  if (!p.log_type) return res.status(400).json({ message: "log_type is required" });

  try {
    const [result] = await pool.query(
      `INSERT INTO fitness_logs
       (user_id, log_type, age, gender, height_cm, weight_kg, activity_level, bmi, bmr, tdee,
        workout_type, duration_min, intensity, calories_burned, water_ml)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        p.log_type,
        p.age ?? null,
        p.gender ?? null,
        p.height_cm ?? null,
        p.weight_kg ?? null,
        p.activity_level ?? null,
        p.bmi ?? null,
        p.bmr ?? null,
        p.tdee ?? null,
        p.workout_type ?? null,
        p.duration_min ?? null,
        p.intensity ?? null,
        p.calories_burned ?? null,
        p.water_ml ?? null
      ]
    );
    return res.status(201).json({ message: "Log created", id: result.insertId });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

// READ logs for current user
router.get("/", auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM fitness_logs WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    return res.json(rows);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE log (only if belongs to user)
router.delete("/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [result] = await pool.query(
      "DELETE FROM fitness_logs WHERE id=? AND user_id=?",
      [id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Log not found" });
    return res.json({ message: "Log deleted" });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
