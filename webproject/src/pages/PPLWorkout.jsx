import React, { useState } from 'react';

export default function PPLWorkout() {
  const [selectedDays, setSelectedDays] = useState(3);
  const [expandedDay, setExpandedDay] = useState(null);

  const exercises = {
    'Push': [
      { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '2-3 min', difficulty: 'Hard' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90-120 sec', difficulty: 'Hard' },
      { name: 'Overhead Press', sets: 3, reps: '6-8', rest: '2 min', difficulty: 'Very Hard' },
      { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60 sec', difficulty: 'Medium' },
      { name: 'Tricep Dips', sets: 3, reps: '8-12', rest: '90 sec', difficulty: 'Hard' },
      { name: 'Rope Pushdowns', sets: 3, reps: '12-15', rest: '60 sec', difficulty: 'Medium' }
    ],
    'Pull': [
      { name: 'Barbell Deadlift', sets: 3, reps: '3-5', rest: '3 min', difficulty: 'Very Hard' },
      { name: 'Pull-Ups', sets: 4, reps: '6-8', rest: '2-2.5 min', difficulty: 'Hard' },
      { name: 'Barbell Bent-Over Rows', sets: 4, reps: '6-8', rest: '2 min', difficulty: 'Hard' },
      { name: 'Face Pulls', sets: 3, reps: '12-15', rest: '60 sec', difficulty: 'Easy' },
      { name: 'Barbell Shrugs', sets: 3, reps: '8-10', rest: '90 sec', difficulty: 'Hard' },
      { name: 'Barbell Curls', sets: 3, reps: '8-10', rest: '90 sec', difficulty: 'Medium' }
    ],
    'Legs': [
      { name: 'Barbell Squats', sets: 4, reps: '5-8', rest: '2-3 min', difficulty: 'Very Hard' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '8-10', rest: '90 sec', difficulty: 'Hard' },
      { name: 'Leg Press', sets: 3, reps: '8-10', rest: '90 sec', difficulty: 'Hard' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', rest: '90 sec', difficulty: 'Hard' },
      { name: 'Leg Curls', sets: 3, reps: '10-12', rest: '60 sec', difficulty: 'Medium' },
      { name: 'Calf Raises', sets: 4, reps: '12-15', rest: '60 sec', difficulty: 'Medium' }
    ]
  };

  const days = selectedDays === 3
    ? ['Push', 'Pull', 'Legs']
    : ['Push (Strength)', 'Pull (Strength)', 'Legs (Power)', 'Push (Hypertrophy)', 'Pull (Hypertrophy)', 'Legs (Strength)'];

  const getDayExercises = (day) => {
    if (day.includes('Push')) return exercises['Push'];
    if (day.includes('Pull')) return exercises['Pull'];
    if (day.includes('Legs')) return exercises['Legs'];
    return [];
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Very Hard') return '#ef4444';
    if (difficulty === 'Hard') return '#f97316';
    if (difficulty === 'Medium') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="page-wrapper">
      <div className="page-header header-purple">
        <h1>Push-Pull-Legs Program</h1>
        <p>Choose your training frequency and get detailed exercises</p>
      </div>

      <div className="container">
        <div className="grid grid-2 mb-4">
          {[3, 6].map((days) => (
            <div
              key={days}
              onClick={() => setSelectedDays(days)}
              className={`level-card ${selectedDays === days ? 'selected' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="level-title">{days}-Day PPL</h3>
              <p className="text-gray mb-3">
                {days === 3
                  ? 'One complete cycle per week. Great for beginners and intermediate lifters.'
                  : 'Two complete cycles per week. Advanced volume with progressive variations.'}
              </p>
              <p className="font-semibold">{days === 3 ? '3-4 days per week' : '6 days per week'}</p>
            </div>
          ))}
        </div>

        <div className="alert alert-info mb-4">
          <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
          <div>
            <h3 className="font-semibold">About {selectedDays}-Day PPL</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {selectedDays === 3
                ? 'One cycle per week. Perfect for beginners and intermediate lifters.'
                : 'Two cycles per week with progressive exercises. Advanced volume and intensity.'}
            </p>
          </div>
        </div>

        <h2 className="card-title mb-3">Your Training Split</h2>
        {days.map((day, dayIndex) => {
          const dayExercises = getDayExercises(day);
          return (
            <div key={dayIndex} className="accordion">
              <button
                onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
                className="accordion-button"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {dayIndex + 1}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{day}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                      {dayExercises.length} exercises • ~{dayExercises.reduce((acc, ex) => acc + ex.sets, 0)} total sets
                    </p>
                  </div>
                </div>
                <span>{expandedDay === dayIndex ? '▲' : '▼'}</span>
              </button>

              {expandedDay === dayIndex && (
                <div className="accordion-content">
                  {dayExercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="exercise-card">
                      <div className="exercise-header">
                        <div>
                          <h4 className="exercise-title">{exercise.name}</h4>
                          <span
                            className="badge"
                            style={{ background: getDifficultyColor(exercise.difficulty) }}
                          >
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="exercise-details">
                        <div className="detail-box">
                          <p className="detail-label">SETS</p>
                          <p className="detail-value">{exercise.sets}</p>
                        </div>
                        <div className="detail-box">
                          <p className="detail-label">REPS</p>
                          <p className="detail-value">{exercise.reps}</p>
                        </div>
                        <div className="detail-box">
                          <p className="detail-label">REST</p>
                          <p className="detail-value" style={{ fontSize: '0.875rem' }}>{exercise.rest}</p>
                        </div>
                        <div className="detail-box">
                          <p className="detail-label">EXERCISE</p>
                          <p className="detail-value">{exIndex + 1}/{dayExercises.length}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="card mt-4" style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))',
          border: '1px solid #9333ea'
        }}>
          <h3 className="font-bold mb-3">💡 PPL Tips for Success</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'Rest 48 hours before hitting the same muscle group again',
              'Start with compound lifts when fresh, then move to accessories',
              'Progressive overload: try to add 1-2 reps or 2.5-5kg per week',
              'If using 6-day split, take 1 day off per week',
              'Prioritize the first 2-3 exercises per session',
              'Track your weights and reps in a notebook or app'
            ].map((tip, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', color: '#e2e8f0' }}>
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}