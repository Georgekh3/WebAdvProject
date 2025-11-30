import React, { useState } from 'react';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [results, setResults] = useState(null);

  const calculateMetrics = () => {
    if (!height || !weight || !age) {
      alert('Please fill in all fields');
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    // BMI
    const bmi = w / ((h / 100) ** 2);

    let bmiCategory = '';
    let bmiColor = '';
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = '#3b82f6';
    } else if (bmi < 25) {
      bmiCategory = 'Normal Weight';
      bmiColor = '#10b981';
    } else if (bmi < 30) {
      bmiCategory = 'Overweight';
      bmiColor = '#f59e0b';
    } else {
      bmiCategory = 'Obese';
      bmiColor = '#ef4444';
    }

    // BMR
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    // TDEE
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultiplier[activityLevel];

    // Ideal Weight
    const idealWeightMin = (18.5 * h * h) / 10000;
    const idealWeightMax = (24.9 * h * h) / 10000;

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
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 175"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
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
                placeholder="e.g., 25"
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
          </div>

          <div className="form-group">
            <label className="form-label">Activity Level</label>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="form-select">
              <option value="sedentary">Sedentary (Little to no exercise)</option>
              <option value="light">Light (Exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
              <option value="active">Active (Exercise 6-7 days/week)</option>
              <option value="veryActive">Very Active (Intense exercise daily)</option>
            </select>
          </div>

          <button onClick={calculateMetrics} className="btn btn-primary" style={{ width: '100%' }}>
            Calculate My Metrics
          </button>
        </div>

        {results && (
          <div>
            <div className="grid grid-3 mb-4">
              <div className="stat-card">
                <p className="stat-label">BMI</p>
                <p className="stat-value" style={{ color: results.bmiColor }}>{results.bmi}</p>
                <p className="font-semibold" style={{ color: results.bmiColor }}>{results.bmiCategory}</p>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #334155' }}>
                  <p className="stat-label">IDEAL RANGE</p>
                  <p className="stat-green font-bold">18.5 - 24.9</p>
                </div>
              </div>

              <div className="stat-card">
                <p className="stat-label">BASAL METABOLIC RATE</p>
                <p className="stat-value stat-orange">{results.bmr}</p>
                <p className="text-gray">calories/day (at rest)</p>
              </div>

              <div className="stat-card">
                <p className="stat-label">DAILY CALORIC NEEDS</p>
                <p className="stat-value stat-blue">{results.tdee}</p>
                <p className="text-gray">calories/day (with activity)</p>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Calorie Guidelines for Your Goals</h3>
              <div className="grid grid-3">
                <div className="info-box">
                  <p className="stat-label">FAT LOSS (Deficit)</p>
                  <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ef4444' }}>{results.caloriesDeficit}</p>
                  <p className="text-gray">-500 cal/day (lose ~0.5kg/week)</p>
                </div>
                <div className="info-box" style={{ border: '2px solid #10b981' }}>
                  <p className="stat-label">MAINTENANCE</p>
                  <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#10b981' }}>{results.tdee}</p>
                  <p className="text-gray">Stay the same (maintenance)</p>
                </div>
                <div className="info-box">
                  <p className="stat-label">MUSCLE GAIN (Surplus)</p>
                  <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#10b981' }}>{results.caloriesSurplus}</p>
                  <p className="text-gray">+300 cal/day (gain ~0.25kg/week)</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Your Ideal Weight Range</h3>
              <div className="info-box mb-3">
                <p className="stat-label">HEALTHY WEIGHT RANGE</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#14b8a6' }}>
                  {results.idealWeightMin} - {results.idealWeightMax} kg
                </p>
                <p className="text-gray" style={{ marginTop: '0.75rem' }}>
                  Based on your height and BMI healthy range (18.5-24.9)
                </p>
              </div>
            </div>

            <div className="alert alert-warning">
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <div>
                <p className="font-semibold">Important Note</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  BMI doesn't account for muscle mass. Athletes and highly trained individuals may have a higher BMI due to muscle. 
                  Consider body composition (muscle vs fat) rather than just weight. Consult a healthcare professional for personalized advice.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}