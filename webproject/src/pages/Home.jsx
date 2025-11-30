import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: 'Gym Warm-Up Guide',
      description: 'Learn proper warm-up techniques to prevent injuries and maximize performance',
      icon: '🔥',
      color: 'linear-gradient(135deg, #ea580c, #dc2626)',
      route: '/warmup'
    },
    {
      id: 2,
      title: 'Experience Assessment',
      description: 'Tell us your gym experience level and get personalized training recommendations',
      icon: '👥',
      color: 'linear-gradient(135deg, #2563eb, #0891b2)',
      route: '/experience'
    },
    {
      id: 3,
      title: 'Workout Programs',
      description: 'Choose your Push-Pull-Legs training split (3 or 6 days) with detailed exercises',
      icon: '⚡',
      color: 'linear-gradient(135deg, #9333ea, #ec4899)',
      route: '/workout'
    },
    {
      id: 4,
      title: 'BMI Calculator',
      description: 'Calculate your BMI, daily calorie needs, and get body composition recommendations',
      icon: '🧮',
      color: 'linear-gradient(135deg, #059669, #14b8a6)',
      route: '/bmi'
    },
    {
      id: 5,
      title: 'Burn & Water Calculator',
      description: 'Find out how many calories you burn and how much water you need per workout',
      icon: '💧',
      color: 'linear-gradient(135deg, #0891b2, #2563eb)',
      route: '/calculator'
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
      }}>
        <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              💪 GymFit Pro
            </span>
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Your Complete Gym Training
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              & Fitness Companion
            </span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#cbd5e1',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            Get personalized workout plans, calculate your fitness metrics, and optimize your gym sessions with science-backed recommendations.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button
              className="btn btn-primary"
              style={{ fontSize: '1.125rem' }}
              onClick={() => navigate('/workout')}
            >
              Get Started with Workouts
            </button>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '1.125rem' }}
              onClick={() => navigate('/warmup')}
            >
              Learn Warm-Up Techniques
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-3">
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #334155',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#60a5fa', marginBottom: '0.5rem' }}>5+</p>
              <p style={{ color: '#cbd5e1' }}>Complete Features</p>
            </div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #334155',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a78bfa', marginBottom: '0.5rem' }}>100+</p>
              <p style={{ color: '#cbd5e1' }}>Gym Exercises</p>
            </div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #334155',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f472b6', marginBottom: '0.5rem' }}>3+</p>
              <p style={{ color: '#cbd5e1' }}>Training Splits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
          Complete Training Ecosystem
        </h2>

        <div className="grid grid-3">
          {features.map((feature) => (
            <div key={feature.id} style={{ cursor: 'pointer' }}>
              <div
                style={{
                  height: '100%',
                  background: feature.color,
                  padding: '2px',
                  borderRadius: '0.75rem',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => navigate(feature.route)}
              >
                <div style={{
                  height: '100%',
                  background: '#1e293b',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: feature.color,
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    width: 'fit-content',
                    fontSize: '2.5rem'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#cbd5e1', flex: 1 }}>
                    {feature.description}
                  </p>
                  <div style={{
                    background: feature.color,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '600'
                  }}>
                    Explore →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="container" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
          How It Works
        </h2>

        <div className="grid grid-4">
          {[
            { step: '01', title: 'Assess', desc: 'Tell us your experience level', route: '/experience' },
            { step: '02', title: 'Learn', desc: 'Master proper warm-up techniques', route: '/warmup' },
            { step: '03', title: 'Train', desc: 'Follow your personalized workout plan', route: '/workout' },
            { step: '04', title: 'Optimize', desc: 'Track calories and hydration', route: '/calculator' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="card text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(item.route)}
            >
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '1rem' }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p className="text-gray">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{
          background: 'linear-gradient(90deg, #3b82f6, #9333ea)',
          borderRadius: '0.75rem',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Ready to Transform Your Fitness Journey?
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Start with any section below and take control of your gym training today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                background: 'white',
                color: '#3b82f6',
                fontWeight: 'bold',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={() => navigate('/experience')}
            >
              Assess My Level
            </button>
            <button
              style={{
                background: '#2563eb',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={() => navigate('/calculator')}
            >
              Calculate Metrics
            </button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="container" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
          Key Features
        </h2>

        <div className="grid grid-2">
          {[
            '✅ Comprehensive gym exercise library (100+ exercises)',
            '✅ Push-Pull-Legs program (3-day & 6-day options)',
            '✅ Personalized recommendations by experience level',
            '✅ BMI & body composition calculator',
            '✅ Calorie burn calculator with METs formula',
            '✅ Dynamic water intake recommendations',
            '✅ Pre, during & post-workout hydration guide',
            '✅ Fully responsive design (mobile & desktop)',
            '✅ Real-time calorie and water calculations',
            '✅ Evidence-based training recommendations',
            '✅ Beautiful, modern UI with smooth animations',
            '✅ Complete warm-up routine guide'
          ].map((feature, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(30, 41, 59, 0.5)',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid #334155'
            }}>
              <span style={{ color: '#cbd5e1' }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
