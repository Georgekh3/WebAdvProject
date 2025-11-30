import React, { useState } from 'react';

export default function WarmupGuide() {
  const [expandedId, setExpandedId] = useState(null);

  const warmupExercises = [
    {
      id: 1,
      name: "Cardio (Light Intensity)",
      duration: "5-10 minutes",
      details: "Use treadmill, rowing machine, or stationary bike at 50-60% of max effort. This prepares your cardiovascular system and joints.",
      benefits: ["Increases core body temperature", "Improves blood flow", "Reduces injury risk"]
    },
    {
      id: 2,
      name: "Dynamic Stretching",
      duration: "3-5 minutes",
      details: "Arm circles, leg swings, torso twists, walking lunges. Never hold static stretches before lifting.",
      benefits: ["Increases range of motion", "Activates muscles", "Prepares nervous system"]
    },
    {
      id: 3,
      name: "Joint Mobility Work",
      duration: "3-5 minutes",
      details: "Shoulder dislocations with band, hip circles, wrist rotations, ankle circles. Move slowly and controlled.",
      benefits: ["Improves joint health", "Better movement quality", "Prevents injuries"]
    },
    {
      id: 4,
      name: "Movement Prep",
      duration: "2-3 minutes",
      details: "If lifting upper body: do bodyweight push-ups, band pull-aparts. If lower body: goblet squats, glute bridges.",
      benefits: ["Nervous system activation", "Better performance", "Smoother transitions"]
    },
    {
      id: 5,
      name: "Activation Sets",
      duration: "2-3 minutes",
      details: "For first exercise: 1-2 sets with 40-50% of working weight for 5-8 reps. Helps motor units fire properly.",
      benefits: ["CNS activation", "Form preparation", "Confidence building"]
    }
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header header-orange">
        <h1>Gym Warm-Up Guide</h1>
        <p>Prepare Your Body for Safe and Effective Training</p>
      </div>

      <div className="container">
        <div className="card">
          <h2 className="card-title">Why Warm-up is Essential</h2>
          <p className="mb-3">
            A proper warm-up increases blood flow to muscles, elevates core body temperature, and prepares your nervous system for intense exercise. This significantly reduces injury risk and improves performance.
          </p>
          <div className="grid grid-3">
            <div className="info-box text-center">
              <h3 className="font-semibold mb-2">Total Warm-up Time</h3>
              <p className="text-gray">Aim for 10-15 minutes total. More time if you're older or recovering from injury.</p>
            </div>
            <div className="info-box text-center">
              <h3 className="font-semibold mb-2">Heart Rate Goal</h3>
              <p className="text-gray">Warm-up should elevate heart rate to 50-70% of max. You should feel warm and slightly sweaty.</p>
            </div>
            <div className="info-box text-center">
              <h3 className="font-semibold mb-2">Never Skip</h3>
              <p className="text-gray">Warming up is NOT optional. It prevents injuries and improves workout performance by 10-20%.</p>
            </div>
          </div>
        </div>

        <h2 className="card-title mb-3">5-Step Warm-up Routine</h2>
        {warmupExercises.map((exercise) => (
          <div key={exercise.id} className="accordion">
            <button
              onClick={() => setExpandedId(expandedId === exercise.id ? null : exercise.id)}
              className="accordion-button"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  background: 'linear-gradient(90deg, #ea580c, #dc2626)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {exercise.id}
                </div>
                <div>
                  <h3 style={{ fontWeight: '600' }}>{exercise.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{exercise.duration}</p>
                </div>
              </div>
              <span>{expandedId === exercise.id ? '▲' : '▼'}</span>
            </button>

            {expandedId === exercise.id && (
              <div className="accordion-content">
                <p className="mb-3">{exercise.details}</p>
                <p style={{ color: '#f97316', fontWeight: '600', marginBottom: '0.5rem' }}>Benefits:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exercise.benefits.map((benefit, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.5rem',
                        width: '0.5rem',
                        height: '0.5rem',
                        background: '#f97316',
                        borderRadius: '50%'
                      }}></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <div className="card mt-4" style={{ background: 'linear-gradient(90deg, #ea580c, #dc2626)' }}>
          <h2 className="card-title">Quick Warm-up Checklist</h2>
          <div className="grid grid-2">
            <div>
              <div style={{ marginBottom: '0.75rem' }}>
                <input type="checkbox" style={{ marginRight: '0.75rem' }} disabled />
                <span>Light cardio (5-10 min)</span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <input type="checkbox" style={{ marginRight: '0.75rem' }} disabled />
                <span>Dynamic stretching (3-5 min)</span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <input type="checkbox" style={{ marginRight: '0.75rem' }} disabled />
                <span>Joint mobility work (3-5 min)</span>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '0.75rem' }}>
                <input type="checkbox" style={{ marginRight: '0.75rem' }} disabled />
                <span>Movement-specific prep (2-3 min)</span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <input type="checkbox" style={{ marginRight: '0.75rem' }} disabled />
                <span>Light activation sets (2-3 min)</span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <input type="checkbox" style={{ marginRight: '0.75rem' }} disabled />
                <span>Total: 15-20 minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">💡 Pro Tips for Intermediate Lifters</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
              <span style={{ color: '#f97316' }}>•</span>
              <span><strong>Automate it:</strong> Use the same warm-up sequence every time so it becomes muscle memory.</span>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
              <span style={{ color: '#f97316' }}>•</span>
              <span><strong>Match intensity:</strong> Warm up heavier on heavy days, lighter on lighter days.</span>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
              <span style={{ color: '#f97316' }}>•</span>
              <span><strong>Listen to your body:</strong> If sore, extend warm-up by 2-3 minutes.</span>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
              <span style={{ color: '#f97316' }}>•</span>
              <span><strong>Stay hydrated:</strong> Drink water during warm-up, especially on warmer days.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}