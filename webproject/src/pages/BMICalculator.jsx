import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { isLoggedIn } from "../utils/auth";

export default function BMICalculator() {
  const navigate = useNavigate();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [results, setResults] = useState(null);
  const [raw, setRaw] = useState(null);
  const [saveMsg, setSaveMsg] = useState("");

  const calculateMetrics = () => {
    setSaveMsg("");

    if (!height || !weight || !age) {
      alert("Please fill in all fields");
      return;
    }

    const h = Number(height);
    const w = Number(weight);
    const a = Number(age);

    if (!Number.isFinite(h) || !Number.isFinite(w) || !Number.isFinite(a) || h <= 0 || w <= 0 || a <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    const bmi = w / ((h / 100) ** 2);

    let bmiCategory = "";
    let bmiColor = "";
    if (bmi < 18.5) { bmiCategory = "Underweight"; bmiColor = "#3b82f6"; }
    else if (bmi < 25) { bmiCategory = "Normal Weight"; bmiColor = "#10b981"; }
    else if (bmi < 30) { bmiCategory = "Overweight"; bmiColor = "#f59e0b"; }
    else { bmiCategory = "Obese"; bmiColor = "#ef4444"; }

    let bmr;
    if (gender === "male") bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    else bmr = 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;

    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * (activityMultiplier[activityLevel] ?? 1.55);

    const idealWeightMin = (18.5 * h * h) / 10000;
    const idealWeightMax = (24.9 * h * h) / 10000;

    setRaw({ h, w, a, bmi, bmr, tdee });

    setResults({
      bmi: bmi.toFixed(1),
      bmiCategory,
      bmiColor,
      bmr: bmr.toFixed(0),
      tdee: tdee.toFixed(0),
      caloriesDeficit: (tdee - 500).toFixed(0),
      caloriesSurplus: (tdee + 300).toFixed(0),
      idealWeightMin: idealWeightMin.toFixed(1),
      idealWeightMax: idealWeightMax.toFixed(1)
    });
  };

  const saveToDb = async () => {
    setSaveMsg("");
    if (!results || !raw) return;

    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/api/logs", {
        log_type: "BMI",
        height_cm: Number(raw.h.toFixed(2)),
        weight_kg: Number(raw.w.toFixed(2)),
        age: Number(raw.a),
        gender,
        activity_level: activityLevel,
        bmi: Number(raw.bmi.toFixed(2)),
        bmr: Number(Math.round(raw.bmr)),
        tdee: Number(Math.round(raw.tdee))
      });
      setSaveMsg("Saved ✅ (BMI record stored in MySQL)");
    } catch (err) {
      setSaveMsg(err?.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-green">
        <h1>BMI & Body Metrics Calculator</h1>
        <p>Get personalized insights about your body composition</p>
      </div>

      <div className="container">
        <div className="card">
          <h2 className="card-title">Your Body Information</h2>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Age (years)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Activity Level</label>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="form-select">
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="veryActive">Very Active</option>
            </select>
          </div>

          <button onClick={calculateMetrics} className="btn btn-primary" style={{ width: "100%" }}>
            Calculate My Metrics
          </button>
        </div>

        {results && (
          <div>
            {saveMsg && (
              <div className="alert alert-info">
                <span style={{ fontSize: "1.5rem" }}>ℹ️</span>
                <div>{saveMsg}</div>
              </div>
            )}

            <div className="grid grid-3 mb-4">
              <div className="stat-card">
                <p className="stat-label">BMI</p>
                <p className="stat-value" style={{ color: results.bmiColor }}>{results.bmi}</p>
                <p className="font-semibold" style={{ color: results.bmiColor }}>{results.bmiCategory}</p>
              </div>

              <div className="stat-card">
                <p className="stat-label">BMR</p>
                <p className="stat-value stat-orange">{results.bmr}</p>
                <p className="text-gray">cal/day (at rest)</p>
              </div>

              <div className="stat-card">
                <p className="stat-label">TDEE</p>
                <p className="stat-value stat-blue">{results.tdee}</p>
                <p className="text-gray">cal/day (with activity)</p>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Your Ideal Weight Range</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#14b8a6" }}>
                {results.idealWeightMin} - {results.idealWeightMax} kg
              </p>

              <button onClick={saveToDb} className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
                Save Result
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
