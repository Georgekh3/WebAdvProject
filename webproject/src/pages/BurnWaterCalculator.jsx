import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { isLoggedIn } from "../utils/auth";

export default function BurnWaterCalculator() {
  const navigate = useNavigate();

  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [workoutType, setWorkoutType] = useState("push");
  const [duration, setDuration] = useState("60");
  const [intensity, setIntensity] = useState("moderate");

  const [results, setResults] = useState(null);
  const [raw, setRaw] = useState(null);
  const [saveMsg, setSaveMsg] = useState("");

  const workoutTypes = {
    push: { name: "Push Day", metsLight: 4.5, metsMod: 6.5, metsHeavy: 9 },
    pull: { name: "Pull Day", metsLight: 4.5, metsMod: 6.5, metsHeavy: 9 },
    legs: { name: "Leg Day", metsLight: 5, metsMod: 7.5, metsHeavy: 10 },
    cardio: { name: "Cardio", metsLight: 5, metsMod: 8, metsHeavy: 12 },
    fullbody: { name: "Full Body", metsLight: 4, metsMod: 6, metsHeavy: 8.5 }
  };

  const calculateMetrics = () => {
    setSaveMsg("");

    if (!weight || !age || !duration) {
      alert("Please fill in all fields");
      return;
    }

    const w = Number(weight);
    const a = Number(age);
    const d = Number(duration);

    if (!Number.isFinite(w) || !Number.isFinite(a) || !Number.isFinite(d) || w <= 0 || a <= 0 || d <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    const workout = workoutTypes[workoutType];

    let mets = intensity === "light" ? workout.metsLight : intensity === "moderate" ? workout.metsMod : workout.metsHeavy;

    const caloriesBurnedNum = mets * w * (d / 60);

    const waterPerHour = intensity === "light" ? 7 : intensity === "moderate" ? 8.5 : 10;
    const waterNeededNum = w * waterPerHour * (d / 60);

    setRaw({ w, a, d });

    setResults({
      caloriesBurned: Math.round(caloriesBurnedNum),
      waterDuringWorkout: Math.round(waterNeededNum)
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
        log_type: "WORKOUT",
        age: Number(raw.a),
        gender,
        workout_type: workoutType,
        duration_min: Number(raw.d),
        intensity,
        calories_burned: Number(results.caloriesBurned),
        water_ml: Number(results.waterDuringWorkout)
      });

      setSaveMsg("Saved ✅ (Workout record stored in MySQL)");
    } catch (err) {
      setSaveMsg(err?.response?.data?.message || "Save failed");
    }
  };

  const resetForm = () => {
    setWeight("");
    setAge("");
    setResults(null);
    setRaw(null);
    setSaveMsg("");
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-cyan">
        <h1>Workout Burn & Water Calculator</h1>
        <p>Estimate calories burned and hydration needed</p>
      </div>

      <div className="container">
        <div className="card">
          <h2 className="card-title">Workout Details</h2>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Body Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Workout Type</label>
              <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} className="form-select">
                {Object.entries(workoutTypes).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Duration (minutes)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Intensity</label>
              <select value={intensity} onChange={(e) => setIntensity(e.target.value)} className="form-select">
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={calculateMetrics} className="btn btn-primary" style={{ flex: 1 }}>Calculate</button>
            <button onClick={resetForm} className="btn btn-secondary" style={{ flex: 1 }}>Reset</button>
          </div>
        </div>

        {results && (
          <div>
            {saveMsg && (
              <div className="alert alert-info">
                <span style={{ fontSize: "1.5rem" }}>ℹ️</span>
                <div>{saveMsg}</div>
              </div>
            )}

            <div className="grid grid-2 mb-4">
              <div className="stat-card">
                <p className="stat-label">CALORIES BURNED</p>
                <p className="stat-value stat-orange">{results.caloriesBurned}</p>
              </div>

              <div className="stat-card">
                <p className="stat-label">WATER NEEDED</p>
                <p className="stat-value stat-blue">{results.waterDuringWorkout} ml</p>
              </div>
            </div>

            <button onClick={saveToDb} className="btn btn-primary" style={{ width: "100%" }}>
              Save Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
