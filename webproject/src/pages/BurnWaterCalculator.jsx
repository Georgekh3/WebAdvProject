import React, { useState } from 'react';


export default function BurnWaterCalculator() {
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [workoutType, setWorkoutType] = useState('push');
  const [duration, setDuration] = useState('60');
  const [intensity, setIntensity] = useState('moderate');
  const [results, setResults] = useState(null);

  const workoutTypes = {
    push: { name: 'Push Day', metsLight: 4.5, metsMod: 6.5, metsHeavy: 9 },
    pull: { name: 'Pull Day', metsLight: 4.5, metsMod: 6.5, metsHeavy: 9 },
    legs: { name: 'Leg Day', metsLight: 5, metsMod: 7.5, metsHeavy: 10 },
    cardio: { name: 'Cardio', metsLight: 5, metsMod: 8, metsHeavy: 12 },
    fullbody: { name: 'Full Body', metsLight: 4, metsMod: 6, metsHeavy: 8.5 }
  };

  const calculateMetrics = () => {
    if (!weight || !age || !duration) {
      alert('Please fill in all fields');
      return;
    }

    const w = parseFloat(weight);
    const d = parseFloat(duration);
    const workout = workoutTypes[workoutType];

    // Get METs
    let mets = 0;
    if (intensity === 'light') mets = workout.metsLight;
    else if (intensity === 'moderate') mets = workout.metsMod;
    else mets = workout.metsHeavy;

    // Calories burned
    const caloriesBurned = (mets * w * (d / 60)).toFixed(0);

    // Water needed
    let waterPerHour = intensity === 'light' ? 7 : intensity === 'moderate' ? 8.5 : 10;
    const waterNeeded = (w * waterPerHour * (d / 60)).toFixed(0);
    const waterGlasses = (waterNeeded / 250).toFixed(1);
    const waterBottles = (waterNeeded / 500).toFixed(1);

    // Daily water
    const dailyWaterMl = (w * 35).toFixed(0);
    const dailyWaterLiters = (dailyWaterMl / 1000).toFixed(2);
    
    const totalTrainingDayWater = (parseFloat(dailyWaterMl) + parseFloat(waterNeeded)).toFixed(0);
    const totalTrainingDayLiters = (totalTrainingDayWater / 1000).toFixed(2);

    const recoveryWater = (w * 1.5).toFixed(0);

    setResults({
      caloriesBurned,
      waterDuringWorkout: waterNeeded,
      waterGlasses,
      waterBottles,
      dailyWaterLiters,
      totalTrainingDayLiters,
      recoveryWater,
      mets: mets.toFixed(1)
    });
  };

  const resetForm = () => {
    setWeight('');
    setAge('');
    setResults(null);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-cyan">
        <h1>Workout Burn & Hydration Calculator</h1>
        <p>Calculate calories burned and your personalized water intake</p>
      </div>

      <div className="container">
        <div className="card">
          <h2 className="card-title">Your Workout Details</h2>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Body Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 80"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 28"
                className="form-input"
              />
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
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 60"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Intensity Level</label>
              <select value={intensity} onChange={(e) => setIntensity(e.target.value)} className="form-select">
                <option value="light">Light (Low effort, easy pace)</option>
                <option value="moderate">Moderate (Steady, controlled pace)</option>
                <option value="high">High (Heavy weights, high intensity)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={calculateMetrics} className="btn btn-primary" style={{ flex: 1 }}>
              Calculate
            </button>
            <button onClick={resetForm} className="btn btn-secondary" style={{ flex: 1 }}>
              Reset
            </button>
          </div>
        </div>

        {results && (
          <div>
            <div className="grid grid-2 mb-4">
              <div className="card" style={{ background: 'linear-gradient(135deg, #7c2d12, #991b1b)', border: '1px solid #ea580c' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>🔥</span>
                  <span className="font-semibold" style={{ color: '#fed7aa' }}>CALORIES BURNED</span>
                </div>
                <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fdba74', marginBottom: '0.5rem' }}>
                  {results.caloriesBurned}
                </p>
                <p style={{ color: '#fed7aa' }}>kcal during {duration} minute workout</p>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ea580c' }}>
                  <p style={{ color: '#fed7aa', opacity: 0.7, fontSize: '0.875rem' }}>Intensity: {results.mets} METs</p>
                </div>
              </div>

              <div className="card" style={{ background: 'linear-gradient(135deg, #164e63, #1e3a8a)', border: '1px solid #0891b2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>💧</span>
                  <span className="font-semibold" style={{ color: '#a5f3fc' }}>WATER DURING WORKOUT</span>
                </div>
                <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#67e8f9', marginBottom: '0.5rem' }}>
                  {results.waterDuringWorkout}
                </p>
                <p style={{ color: '#a5f3fc' }}>ml ({results.waterGlasses} glasses / {results.waterBottles} bottles)</p>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #0891b2' }}>
                  <p style={{ color: '#a5f3fc', opacity: 0.7, fontSize: '0.875rem' }}>Drink every 15-20 minutes</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Daily Hydration Plan</h3>
              <div className="grid grid-3">
                <div className="info-box">
                  <p className="stat-label">BASE DAILY NEEDS</p>
                  <p className="stat-value stat-cyan">{results.dailyWaterLiters}L</p>
                  <p className="text-gray">Even on rest days</p>
                </div>

                <div className="info-box" style={{ border: '2px solid #06b6d4' }}>
                  <p className="stat-label">ON TRAINING DAYS</p>
                  <p className="stat-value stat-cyan">{results.totalTrainingDayLiters}L</p>
                  <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>Recommended</p>
                </div>

                <div className="info-box">
                  <p className="stat-label">POST-WORKOUT (4 hours)</p>
                  <p className="stat-value stat-blue">{results.recoveryWater}</p>
                  <p className="text-gray">ml for rehydration</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Hydration Tips & Electrolytes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="info-box">
                  <p style={{ color: '#67e8f9', fontWeight: '600', marginBottom: '0.5rem' }}>Pre-Workout (30 min before)</p>
                  <p style={{ color: '#cbd5e1' }}>Drink 400-600ml to start hydrated.</p>
                </div>
                <div className="info-box">
                  <p style={{ color: '#67e8f9', fontWeight: '600', marginBottom: '0.5rem' }}>During Workout</p>
                  <p style={{ color: '#cbd5e1' }}>Drink {results.waterDuringWorkout}ml total. Split into smaller amounts every 15-20 minutes.</p>
                </div>
                <div className="info-box">
                  <p style={{ color: '#67e8f9', fontWeight: '600', marginBottom: '0.5rem' }}>Post-Workout</p>
                  <p style={{ color: '#cbd5e1' }}>Drink {results.recoveryWater}ml over next 4 hours. Include sodium and carbs/protein.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Calorie Burn & Nutrition Strategy</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="info-box">
                  <p style={{ color: '#fdba74', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Calories Burned: {results.caloriesBurned} kcal
                  </p>
                  <p style={{ color: '#cbd5e1' }}>This is the additional energy your body used during this workout session.</p>
                </div>
                <div className="info-box">
                  <p style={{ color: '#6ee7b7', fontWeight: '600', marginBottom: '0.5rem' }}>Recommended Post-Workout Meal</p>
                  <p style={{ color: '#cbd5e1' }}>
                    Consume ~{Math.round(results.caloriesBurned * 0.5)} kcal within 1-2 hours post-workout with protein + carbs.
                  </p>
                </div>
              </div>
            </div>

            <div className="alert alert-warning">
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <div>
                <p className="font-semibold">Important Notes</p>
                <ul style={{ fontSize: '0.875rem', marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                  <li>These calculations are estimates. Individual calorie burn varies.</li>
                  <li>Hydration needs increase in hot/humid environments - add 25-50% more water.</li>
                  <li>Don't rely solely on thirst - drink according to this schedule.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {!results && (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
              Fill in your workout details and click Calculate to see personalized recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}