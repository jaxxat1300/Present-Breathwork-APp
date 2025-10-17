import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  // State management
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold1, exhale, hold2
  const [phaseTime, setPhaseTime] = useState(0);
  const [metrics, setMetrics] = useState({
    amUsage: 0,
    pmUsage: 0,
    benefitCount: 0
  });

  const intervalRef = useRef(null);
  const phaseIntervalRef = useRef(null);

  // Load metrics from localStorage on component mount
  useEffect(() => {
    const savedMetrics = localStorage.getItem('breathworkMetrics');
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
  }, []);

  // Save metrics to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('breathworkMetrics', JSON.stringify(metrics));
  }, [metrics]);

  // Track usage based on time of day
  const trackUsage = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      setMetrics(prev => ({ ...prev, amUsage: prev.amUsage + 1 }));
    } else {
      setMetrics(prev => ({ ...prev, pmUsage: prev.pmUsage + 1 }));
    }
  };

  // Mobile haptic feedback simulation
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration
    }
  };

  // Mobile touch handlers
  const handleTouchStart = (e) => {
    e.currentTarget.style.transform = 'scale(0.95)';
  };

  const handleTouchEnd = (e) => {
    e.currentTarget.style.transform = '';
  };

  // Exercise configurations
  const exercises = {
    boxBreathing: {
      name: 'Box Breathing',
      duration: 20,
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose' },
        { name: 'Hold', duration: 4, instruction: 'Hold your breath gently' },
        { name: 'Exhale', duration: 4, instruction: 'Exhale slowly through your mouth' },
        { name: 'Hold', duration: 4, instruction: 'Hold empty, then repeat' }
      ],
      disclaimer: 'Please practice while stationary for safety.'
    },
    deepBelly: {
      name: 'Deep Belly Breath',
      duration: 15,
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Breathe deeply into your belly' },
        { name: 'Exhale', duration: 10, instruction: 'Exhale slowly and completely' }
      ],
      disclaimer: 'Please practice while stationary for safety.'
    },
    mindfulPause: {
      name: 'Mindful Pause',
      duration: 30,
      phases: [
        { name: 'Notice', duration: 30, instruction: 'Notice 5 things you see, 4 you feel, 3 sounds, 2 smells, 1 taste' }
      ],
      disclaimer: 'Safe to practice anywhere.'
    }
  };

  // Start exercise
  const startExercise = (exerciseKey) => {
    const exercise = exercises[exerciseKey];
    setCurrentExercise({ key: exerciseKey, ...exercise });
    setTimeLeft(exercise.duration);
    setIsActive(true);
    setBreathPhase('inhale');
    setPhaseTime(0);
    trackUsage();
    triggerHapticFeedback(); // Mobile haptic feedback
  };

  // Stop exercise
  const stopExercise = () => {
    setIsActive(false);
    setCurrentExercise(null);
    setTimeLeft(0);
    setBreathPhase('inhale');
    setPhaseTime(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
  };

  // Timer countdown
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setCurrentExercise(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);

  // Breathing phase management
  useEffect(() => {
    if (isActive && currentExercise) {
      const currentPhase = currentExercise.phases[0];
      let phaseIndex = 0;
      let phaseStartTime = 0;

      phaseIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - phaseStartTime;
        const currentPhaseDuration = currentPhase.duration * 1000;

        if (elapsed >= currentPhaseDuration) {
          phaseIndex = (phaseIndex + 1) % currentExercise.phases.length;
          phaseStartTime = Date.now();
          setBreathPhase(currentExercise.phases[phaseIndex].name.toLowerCase().replace(' ', ''));
        }
      }, 100);

      return () => {
        if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
      };
    }
  }, [isActive, currentExercise]);

  // Mark benefit
  const markBenefit = () => {
    setMetrics(prev => ({ ...prev, benefitCount: prev.benefitCount + 1 }));
    triggerHapticFeedback(); // Mobile haptic feedback
  };

  // Reset metrics
  const resetMetrics = () => {
    setMetrics({ amUsage: 0, pmUsage: 0, benefitCount: 0 });
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Present Breathwork</h1>
        <p className="subtitle">Stay grounded in the moment</p>
      </header>

      <main className="app-main">
        {!currentExercise ? (
          <div className="exercise-selection">
            <div className="metrics-display">
              <h3>Your Progress</h3>
              <div className="metrics-grid">
                <div className="metric">
                  <span className="metric-label">AM Sessions</span>
                  <span className="metric-value">{metrics.amUsage}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">PM Sessions</span>
                  <span className="metric-value">{metrics.pmUsage}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Benefits</span>
                  <span className="metric-value">{metrics.benefitCount}</span>
                </div>
              </div>
              <button className="reset-btn" onClick={resetMetrics}>
                Reset Progress
              </button>
            </div>

            <div className="exercises">
              <h3>Choose an Exercise</h3>
              <div className="exercise-cards">
                <div 
                  className="exercise-card" 
                  onClick={() => startExercise('boxBreathing')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <h4>Box Breathing</h4>
                  <p>4-4-4-4 pattern</p>
                  <span className="duration">20 seconds</span>
                </div>
                <div 
                  className="exercise-card" 
                  onClick={() => startExercise('deepBelly')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <h4>Deep Belly Breath</h4>
                  <p>Calming breathwork</p>
                  <span className="duration">15 seconds</span>
                </div>
                <div 
                  className="exercise-card" 
                  onClick={() => startExercise('mindfulPause')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <h4>Mindful Pause</h4>
                  <p>5-4-3-2-1 grounding</p>
                  <span className="duration">30 seconds</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="exercise-active">
            <div className="exercise-header">
              <h2>{currentExercise.name}</h2>
              <div className="timer">{formatTime(timeLeft)}</div>
            </div>

            <div className="breathing-circle-container">
              <div className={`breathing-circle ${breathPhase}`}>
                <div className="circle-inner">
                  <span className="phase-text">
                    {currentExercise.phases[0]?.instruction || 'Breathe naturally'}
                  </span>
                </div>
              </div>
            </div>

            <div className="exercise-controls">
              <button className="stop-btn" onClick={stopExercise}>
                Stop Exercise
              </button>
              <button className="benefit-btn" onClick={markBenefit}>
                I Benefited ✨
              </button>
            </div>

            <div className="disclaimer">
              <p>{currentExercise.disclaimer}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
