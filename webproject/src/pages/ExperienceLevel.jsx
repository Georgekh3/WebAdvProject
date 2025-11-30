import React, { useState } from 'react';

export default function ExperienceLevel() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = [
    {
      id: 'beginner',
      name: 'Beginner',
      icon: '🌱',
      description: 'New to gym or training less than 6 months',
      sets: '3 sets',
      reps: '8-12 reps',
      frequency: '3 days per week',
      rest: '60-90 seconds',
      duration: '45-60 minutes',
      tips: [
        'Focus on learning proper form before adding weight',
        'Use lighter weights with high reps (10-15)',
        'Rest 60-90 seconds between sets',
        'Train 3 days per week to allow recovery',
        'Avoid complex programs - keep it simple'
      ]
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      icon: '💪',
      description: '6 months to 2 years of consistent training',
      sets: '4 sets',
      reps: '6-12 reps',
      frequency: '4-6 days per week',
      rest: '90-120 seconds',
      duration: '60-90 minutes',
      tips: [
        'Now ready for Push/Pull/Legs split',
        'Incorporate progressive overload each week',
        'Vary rep ranges: 6-8, 8-12, 12-15',
        'Rest 90-120 seconds for compound lifts',
        'Add accessory exercises for weak points'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: '🔥',
      description: 'More than 2 years of serious training',
      sets: '4-5 sets',
      reps: '3-12 reps',
      frequency: '5-6 days per week',
      rest: '2-3 minutes',
      duration: '90-120 minutes',
      tips: [
        'Use periodization and periodized blocks',
        'Implement deload weeks every 4-6 weeks',
        'Focus on weak points and lagging muscle groups',
        'Experiment with different rep ranges strategically',
        'Track everything - volume, intensity, recovery'
      ]
    }
  ];

  const selected = levels.find(l => l.id === selectedLevel);

  return (
    <div className="page-wrapper">
      <div className="page-header header-blue">
        <h1>What's Your Experience Level?</h1>
        <p>This helps us personalize your training recommendations</p>
      </div>

      <div className="container">
        <div className="grid grid-3">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`level-card ${selectedLevel === level.id ? 'selected' : ''}`}
            >
              <div className="level-icon">{level.icon}</div>
              <h3 className="level-title">{level.name}</h3>
              <p className="text-gray">{level.description}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div className="card mt-4">
            <div style={{
              background: 'linear-gradient(90deg, #2563eb, #0891b2)',
              padding: '1.5rem',
              borderRadius: '0.75rem 0.75rem 0 0',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {selected.icon} {selected.name} Training Plan
              </h2>
              <p>Personalized recommendations for your experience level</p>
            </div>

            <div className="grid grid-3 mb-4">
              <div className="stat-card">
                <p className="stat-label">SETS PER EXERCISE</p>
                <p className="stat-value stat-blue">{selected.sets}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">REP RANGE</p>
                <p className="stat-value stat-cyan">{selected.reps}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">FREQUENCY</p>
                <p className="stat-value stat-blue">{selected.frequency}</p>
              </div>
            </div>

            <div className="grid grid-2 mb-4">
              <div className="info-box">
                <p className="stat-label">REST BETWEEN SETS</p>
                <p className="font-bold" style={{ fontSize: '1.25rem' }}>{selected.rest}</p>
              </div>
              <div className="info-box">
                <p className="stat-label">SESSION DURATION</p>
                <p className="font-bold" style={{ fontSize: '1.25rem' }}>{selected.duration}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                ✓ Key Points to Remember
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {selected.tips.map((tip, idx) => (
                  <li key={idx} style={{
                    marginBottom: '0.75rem',
                    display: 'flex',
                    gap: '0.75rem',
                    color: '#cbd5e1'
                  }}>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="alert alert-warning">
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <div>
                <p className="font-semibold">Important Note</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  The recommendations above are general guidelines. Always prioritize proper form over weight. 
                  If something feels wrong, reduce weight or stop the exercise and consult a trainer.
                </p>
              </div>
            </div>
          </div>
        )}

        {!selected && (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
              Select your experience level to see personalized recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}