import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  // Navigation state
  const [currentView, setCurrentView] = useState('home'); // home, categories, exercise, profile, settings, feedback
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Enhanced metrics
  const [metrics, setMetrics] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
    lastSession: null,
    favoriteExercises: [],
    weeklyGoal: 5,
    weeklyProgress: 0,
    categoryUsage: {
      stress: 0,
      depression: 0,
      everyday: 0,
      energy: 0,
      sleep: 0
    },
    feedbackHistory: []
  });

  // User profile and preferences
  const [profile, setProfile] = useState({
    name: '',
    soundEnabled: true,
    hapticEnabled: true,
    quickStartEnabled: true
  });

  // Audio system
  const [audioEnabled, setAudioEnabled] = useState(true);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const phaseIntervalRef = useRef(null);

  // Exercise categories and configurations
  const categories = {
    stress: {
      name: 'Stress & Anxiety',
      icon: '🧘',
      description: 'Quick relief when you need to calm down',
      color: '#8B5FBF',
      exercises: ['boxBreathing', 'deepBelly', 'calmingBreath', 'anxietyRelief']
    },
    depression: {
      name: 'Mood & Depression',
      icon: '🌈',
      description: 'Uplift your mood and energy',
      color: '#9F7AEA',
      exercises: ['energizingBreath', 'moodBoost', 'gratitudeBreath']
    },
    everyday: {
      name: 'Everyday Wellness',
      icon: '✨',
      description: 'Daily practices for balanced well-being',
      color: '#7C3AED',
      exercises: ['morningBreath', 'afternoonReset', 'mindfulPause', 'quickRefresh']
    },
    sleep: {
      name: 'Sleep & Rest',
      icon: '🌙',
      description: 'Wind down and prepare for restful sleep',
      color: '#6B46C1',
      exercises: ['sleepPrep', 'eveningCalm', 'deepRelaxation']
    },
    energy: {
      name: 'Energy Boost',
      icon: '⚡',
      description: 'Quick energy when you need alertness',
      color: '#5B21B6',
      exercises: ['powerBreath', 'focusBoost', 'quickEnergizer']
    }
  };

  const exercises = {
    // STRESS & ANXIETY
    boxBreathing: {
      name: 'Box Breathing',
      duration: 120,
      quickDuration: 60,
      category: 'stress',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly' },
        { name: 'Hold', duration: 4, instruction: 'Hold gently' },
        { name: 'Exhale', duration: 4, instruction: 'Release slowly' },
        { name: 'Hold', duration: 4, instruction: 'Pause empty' }
      ],
      description: 'Navy SEAL technique for instant calm',
      benefits: 'Reduces stress, anxiety, and panic'
    },
    deepBelly: {
      name: 'Deep Belly Breath',
      duration: 120,
      quickDuration: 60,
      category: 'stress',
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Breathe into your belly' },
        { name: 'Exhale', duration: 7, instruction: 'Release completely' }
      ],
      description: 'Activate your calm nervous system',
      benefits: 'Lowers heart rate, reduces stress hormones'
    },
    calmingBreath: {
      name: 'Calming 4-7-8',
      duration: 90,
      quickDuration: 45,
      category: 'stress',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in through nose' },
        { name: 'Hold', duration: 7, instruction: 'Hold the breath' },
        { name: 'Exhale', duration: 8, instruction: 'Exhale through mouth' }
      ],
      description: 'Dr. Weil\'s natural tranquilizer',
      benefits: 'Calms anxiety, stops panic attacks'
    },
    anxietyRelief: {
      name: 'Anxiety Relief',
      duration: 180,
      quickDuration: 90,
      category: 'stress',
      phases: [
        { name: 'Inhale', duration: 3, instruction: 'Slow inhale' },
        { name: 'Exhale', duration: 6, instruction: 'Long, slow exhale' }
      ],
      description: 'Extended exhales for deep calm',
      benefits: 'Stops racing thoughts, releases tension'
    },

    // MOOD & DEPRESSION
    energizingBreath: {
      name: 'Energizing Breath',
      duration: 90,
      quickDuration: 45,
      category: 'depression',
      phases: [
        { name: 'Inhale', duration: 2, instruction: 'Quick, energizing inhale' },
        { name: 'Exhale', duration: 2, instruction: 'Powerful exhale' }
      ],
      description: 'Wake up your body and mind',
      benefits: 'Increases energy, lifts mood'
    },
    moodBoost: {
      name: 'Mood Boost',
      duration: 120,
      quickDuration: 60,
      category: 'depression',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in positivity' },
        { name: 'Hold', duration: 2, instruction: 'Feel the energy' },
        { name: 'Exhale', duration: 4, instruction: 'Release negativity' }
      ],
      description: 'Shift your emotional state',
      benefits: 'Improves mood, reduces sadness'
    },
    gratitudeBreath: {
      name: 'Gratitude Breath',
      duration: 180,
      quickDuration: 90,
      category: 'depression',
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Think of something good' },
        { name: 'Hold', duration: 3, instruction: 'Feel grateful' },
        { name: 'Exhale', duration: 5, instruction: 'Smile and release' }
      ],
      description: 'Combine breathing with gratitude',
      benefits: 'Lifts depression, creates positive mindset'
    },

    // EVERYDAY WELLNESS
    morningBreath: {
      name: 'Morning Energizer',
      duration: 120,
      quickDuration: 60,
      category: 'everyday',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Wake up your body' },
        { name: 'Hold', duration: 2, instruction: 'Feel alive' },
        { name: 'Exhale', duration: 4, instruction: 'Start fresh' }
      ],
      description: 'Perfect way to start your day',
      benefits: 'Increases alertness, sets positive tone'
    },
    afternoonReset: {
      name: 'Afternoon Reset',
      duration: 90,
      quickDuration: 45,
      category: 'everyday',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Refresh your mind' },
        { name: 'Exhale', duration: 4, instruction: 'Release the day' }
      ],
      description: 'Mid-day mental refresh',
      benefits: 'Restores focus, renews energy'
    },
    mindfulPause: {
      name: 'Mindful Pause',
      duration: 120,
      quickDuration: 60,
      category: 'everyday',
      phases: [
        { name: 'Notice', duration: 5, instruction: 'Simply observe your breath' }
      ],
      description: 'Return to the present moment',
      benefits: 'Grounds you, improves awareness'
    },
    quickRefresh: {
      name: 'Quick Refresh',
      duration: 60,
      quickDuration: 30,
      category: 'everyday',
      phases: [
        { name: 'Inhale', duration: 3, instruction: 'Quick energizing breath' },
        { name: 'Exhale', duration: 3, instruction: 'Let it go' }
      ],
      description: 'Fast reset for busy moments',
      benefits: 'Instant clarity and calm'
    },

    // SLEEP & REST
    sleepPrep: {
      name: 'Sleep Preparation',
      duration: 240,
      quickDuration: 120,
      category: 'sleep',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Slow, deep inhale' },
        { name: 'Exhale', duration: 8, instruction: 'Long, relaxing exhale' }
      ],
      description: 'Prepare body and mind for sleep',
      benefits: 'Improves sleep quality, reduces insomnia'
    },
    eveningCalm: {
      name: 'Evening Calm',
      duration: 180,
      quickDuration: 90,
      category: 'sleep',
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Breathe in peace' },
        { name: 'Exhale', duration: 7, instruction: 'Release the day' }
      ],
      description: 'Wind down after a busy day',
      benefits: 'Calms mind, prepares for rest'
    },
    deepRelaxation: {
      name: 'Deep Relaxation',
      duration: 300,
      quickDuration: 150,
      category: 'sleep',
      phases: [
        { name: 'Inhale', duration: 6, instruction: 'Deep, slow breath' },
        { name: 'Exhale', duration: 10, instruction: 'Complete release' }
      ],
      description: 'Full body and mind relaxation',
      benefits: 'Deep calm, profound rest'
    },

    // ENERGY BOOST
    powerBreath: {
      name: 'Power Breath',
      duration: 60,
      quickDuration: 30,
      category: 'energy',
      phases: [
        { name: 'Inhale', duration: 1, instruction: 'Sharp inhale' },
        { name: 'Exhale', duration: 1, instruction: 'Forceful exhale' }
      ],
      description: 'Instant energy surge',
      benefits: 'Wakes you up, increases alertness'
    },
    focusBoost: {
      name: 'Focus Boost',
      duration: 90,
      quickDuration: 45,
      category: 'energy',
      phases: [
        { name: 'Inhale', duration: 3, instruction: 'Energize your mind' },
        { name: 'Hold', duration: 2, instruction: 'Build focus' },
        { name: 'Exhale', duration: 3, instruction: 'Sharp exhale' }
      ],
      description: 'Sharpen your concentration',
      benefits: 'Improves focus, boosts mental clarity'
    },
    quickEnergizer: {
      name: 'Quick Energizer',
      duration: 45,
      quickDuration: 30,
      category: 'energy',
      phases: [
        { name: 'Inhale', duration: 2, instruction: 'Fast inhale' },
        { name: 'Exhale', duration: 2, instruction: 'Quick release' }
      ],
      description: '30-second energy boost',
      benefits: 'Fast energy, instant alertness'
    }
  };

  // Feedback questions
  const feedbackQuestions = [
    {
      id: 'feeling',
      question: 'How do you feel right now?',
      options: ['Much better', 'Better', 'Same', 'Worse']
    },
    {
      id: 'stress',
      question: 'Your stress level?',
      options: ['Low', 'Moderate', 'High', 'Very High']
    },
    {
      id: 'helpful',
      question: 'Was this session helpful?',
      options: ['Very helpful', 'Helpful', 'Somewhat', 'Not really']
    }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedMetrics = localStorage.getItem('breathworkMetrics');
    const savedProfile = localStorage.getItem('breathworkProfile');
    
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('breathworkMetrics', JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem('breathworkProfile', JSON.stringify(profile));
  }, [profile]);

  // Audio system
  useEffect(() => {
    if (audioEnabled && profile.soundEnabled) {
      if (!audioRef.current) {
        audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
  }, [audioEnabled, profile.soundEnabled]);

  const playBreathingSound = (phase) => {
    if (!audioEnabled || !profile.soundEnabled) return;
    
    try {
      const oscillator = audioRef.current.createOscillator();
      const gainNode = audioRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioRef.current.destination);
      
      const frequencies = {
        inhale: 220,
        hold: 330,
        exhale: 110,
        notice: 440
      };
      
      oscillator.frequency.setValueAtTime(frequencies[phase] || 220, audioRef.current.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioRef.current.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioRef.current.currentTime + 0.5);
      
      oscillator.start(audioRef.current.currentTime);
      oscillator.stop(audioRef.current.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const triggerHapticFeedback = () => {
    if (profile.hapticEnabled && 'vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  };

  // Start exercise
  const startExercise = (exerciseKey, isQuick = false) => {
    const exercise = exercises[exerciseKey];
    const duration = isQuick ? exercise.quickDuration : exercise.duration;
    
    setCurrentExercise({ key: exerciseKey, ...exercise, actualDuration: duration });
    setTimeLeft(duration);
    setIsActive(true);
    setBreathPhase('inhale');
    setCurrentView('exercise');
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalMinutes: prev.totalMinutes + Math.ceil(duration / 60),
      lastSession: new Date().toISOString(),
      categoryUsage: {
        ...prev.categoryUsage,
        [exercise.category]: (prev.categoryUsage[exercise.category] || 0) + 1
      }
    }));
    
    triggerHapticFeedback();
    playBreathingSound('inhale');
  };

  // Stop exercise
  const stopExercise = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
    
    // Show feedback
    setShowFeedback(true);
  };

  const completeFeedback = (answers) => {
    setMetrics(prev => ({
      ...prev,
      feedbackHistory: [...prev.feedbackHistory, {
        exerciseKey: currentExercise.key,
        date: new Date().toISOString(),
        answers: answers
      }]
    }));
    
    setCurrentExercise(null);
    setTimeLeft(0);
    setBreathPhase('inhale');
    setShowFeedback(false);
    setCurrentView('home');
  };

  const skipFeedback = () => {
    setCurrentExercise(null);
    setTimeLeft(0);
    setBreathPhase('inhale');
    setShowFeedback(false);
    setCurrentView('home');
  };

  // Timer countdown
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setShowFeedback(true);
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
      let phaseIndex = 0;
      let phaseStartTime = Date.now();

      phaseIntervalRef.current = setInterval(() => {
        const currentPhase = currentExercise.phases[phaseIndex];
        const elapsed = Date.now() - phaseStartTime;
        const currentPhaseDuration = currentPhase.duration * 1000;

        if (elapsed >= currentPhaseDuration) {
          phaseIndex = (phaseIndex + 1) % currentExercise.phases.length;
          phaseStartTime = Date.now();
          const newPhase = currentExercise.phases[phaseIndex].name.toLowerCase().replace(' ', '');
          setBreathPhase(newPhase);
          playBreathingSound(newPhase);
          triggerHapticFeedback();
        }
      }, 100);

      return () => {
        if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
      };
    }
  }, [isActive, currentExercise]);

  const toggleFavorite = (exerciseKey) => {
    setMetrics(prev => ({
      ...prev,
      favoriteExercises: prev.favoriteExercises.includes(exerciseKey)
        ? prev.favoriteExercises.filter(key => key !== exerciseKey)
        : [...prev.favoriteExercises, exerciseKey]
    }));
  };

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Home view
  const HomeView = () => (
    <div className="home-view">
      <div className="welcome-section">
        <h2>How can we help you today?</h2>
        <p>Choose what you need right now</p>
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-number">{metrics.totalSessions}</span>
          <span className="stat-label">Sessions</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{metrics.totalMinutes}</span>
          <span className="stat-label">Minutes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{metrics.streak}</span>
          <span className="stat-label">Day Streak</span>
        </div>
      </div>

      <div className="categories-grid">
        {Object.entries(categories).map(([key, category]) => (
          <div 
            key={key}
            className="category-card"
            style={{ borderLeft: `4px solid ${category.color}` }}
            onClick={() => {
              setSelectedCategory(key);
              setCurrentView('categories');
            }}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-content">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <div className="category-stats">
                <span>{category.exercises.length} exercises</span>
                <span className="usage-count">
                  {metrics.categoryUsage[key] || 0} sessions
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {metrics.favoriteExercises.length > 0 && (
        <div className="favorites-section">
          <h3>⭐ Your Favorites</h3>
          <div className="favorites-quick">
            {metrics.favoriteExercises.slice(0, 3).map(exerciseKey => (
              <button
                key={exerciseKey}
                className="quick-favorite-btn"
                onClick={() => startExercise(exerciseKey, true)}
              >
                {exercises[exerciseKey].name}
                <span className="quick-label">Quick</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Category view
  const CategoryView = () => {
    const category = categories[selectedCategory];
    const categoryExercises = category.exercises.map(key => ({
      key,
      ...exercises[key]
    }));

    return (
      <div className="category-view">
        <div className="category-header">
          <button className="back-btn-simple" onClick={() => setCurrentView('home')}>
            ← Back
          </button>
          <div className="category-title">
            <span className="category-icon-large">{category.icon}</span>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        </div>

        <div className="exercises-list">
          {categoryExercises.map((exercise) => (
            <div key={exercise.key} className="exercise-item">
              <div className="exercise-info">
                <div className="exercise-title-row">
                  <h3>{exercise.name}</h3>
                  <button 
                    className="favorite-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(exercise.key);
                    }}
                  >
                    {metrics.favoriteExercises.includes(exercise.key) ? '❤️' : '🤍'}
                  </button>
                </div>
                <p className="exercise-desc">{exercise.description}</p>
                <p className="exercise-benefit">✨ {exercise.benefits}</p>
              </div>
              <div className="exercise-actions">
                <button 
                  className="quick-start-btn"
                  onClick={() => startExercise(exercise.key, true)}
                >
                  Quick
                  <span className="time-label">{Math.ceil(exercise.quickDuration / 60)}m</span>
                </button>
                <button 
                  className="full-start-btn"
                  onClick={() => startExercise(exercise.key, false)}
                >
                  Full
                  <span className="time-label">{Math.ceil(exercise.duration / 60)}m</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Exercise view
  const ExerciseView = () => {
    const currentPhase = currentExercise?.phases.find(p => 
      p.name.toLowerCase().replace(' ', '') === breathPhase
    ) || currentExercise?.phases[0];

    return (
      <div className="exercise-active">
        <div className="exercise-top-bar">
          <button className="back-btn-simple" onClick={stopExercise}>
            ← Exit
          </button>
          <div className="timer-display">{formatTime(timeLeft)}</div>
        </div>

        <div className="exercise-title">
          <h2>{currentExercise.name}</h2>
        </div>

        <div className="breathing-circle-container">
          <div className={`breathing-circle ${breathPhase}`}>
            <div className="circle-inner">
              <span className="phase-name">{currentPhase?.name}</span>
            </div>
          </div>
        </div>

        <div className="instruction-text">
          <p>{currentPhase?.instruction}</p>
        </div>

        <div className="exercise-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${((currentExercise.actualDuration - timeLeft) / currentExercise.actualDuration) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Feedback view
  const FeedbackView = () => {
    const [answers, setAnswers] = useState({});

    const handleAnswer = (questionId, answer) => {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const isComplete = Object.keys(answers).length === feedbackQuestions.length;

    return (
      <div className="feedback-view">
        <div className="feedback-header">
          <h2>Quick Feedback</h2>
          <p>How did it go? (Optional)</p>
        </div>

        <div className="feedback-questions">
          {feedbackQuestions.map((q) => (
            <div key={q.id} className="feedback-question">
              <h3>{q.question}</h3>
              <div className="feedback-options">
                {q.options.map((option) => (
                  <button
                    key={option}
                    className={`feedback-option ${answers[q.id] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswer(q.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="feedback-actions">
          <button 
            className="skip-feedback-btn"
            onClick={skipFeedback}
          >
            Skip
          </button>
          <button 
            className="submit-feedback-btn"
            onClick={() => completeFeedback(answers)}
            disabled={!isComplete}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Profile view
  const ProfileView = () => (
    <div className="profile-view">
      <h2>Your Profile</h2>
      
      <div className="profile-section">
        <label>Name</label>
        <input 
          type="text" 
          value={profile.name}
          onChange={(e) => updateProfile({ name: e.target.value })}
          placeholder="Enter your name"
        />
      </div>

      <div className="profile-section">
        <label>
          <input 
            type="checkbox" 
            checked={profile.soundEnabled}
            onChange={(e) => updateProfile({ soundEnabled: e.target.checked })}
          />
          Enable Sound
        </label>
      </div>

      <div className="profile-section">
        <label>
          <input 
            type="checkbox" 
            checked={profile.hapticEnabled}
            onChange={(e) => updateProfile({ hapticEnabled: e.target.checked })}
          />
          Enable Haptic Feedback
        </label>
      </div>

      <div className="stats-section">
        <h3>Your Progress</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-value">{metrics.totalSessions}</span>
            <span className="stat-name">Total Sessions</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{metrics.totalMinutes}</span>
            <span className="stat-name">Minutes</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{metrics.streak}</span>
            <span className="stat-name">Day Streak</span>
          </div>
        </div>
      </div>

      <div className="category-usage-section">
        <h3>Category Usage</h3>
        {Object.entries(categories).map(([key, category]) => (
          <div key={key} className="usage-bar">
            <span>{category.icon} {category.name}</span>
            <span className="usage-number">{metrics.categoryUsage[key] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Settings view
  const SettingsView = () => (
    <div className="settings-view">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <h3>Audio</h3>
        <label>
          <input 
            type="checkbox" 
            checked={audioEnabled}
            onChange={(e) => setAudioEnabled(e.target.checked)}
          />
          Enable Audio Cues
        </label>
      </div>

      <div className="settings-section">
        <h3>Weekly Goal</h3>
        <input 
          type="number" 
          value={metrics.weeklyGoal}
          onChange={(e) => setMetrics(prev => ({ ...prev, weeklyGoal: parseInt(e.target.value) }))}
          min="1"
          max="20"
        />
        <p>Sessions per week: {metrics.weeklyGoal}</p>
      </div>

      <div className="settings-section">
        <button 
          className="reset-btn"
          onClick={() => {
            if (window.confirm('Reset all data?')) {
              setMetrics({
                totalSessions: 0,
                totalMinutes: 0,
                streak: 0,
                lastSession: null,
                favoriteExercises: [],
                weeklyGoal: 5,
                weeklyProgress: 0,
                categoryUsage: {
                  stress: 0,
                  depression: 0,
                  everyday: 0,
                  energy: 0,
                  sleep: 0
                },
                feedbackHistory: []
              });
            }
          }}
        >
          Reset All Data
        </button>
      </div>
    </div>
  );

  // Navigation component
  const Navigation = () => (
    <nav className="navigation">
      <button 
        className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
        onClick={() => setCurrentView('home')}
      >
        🏠
        <span>Home</span>
      </button>
      <button 
        className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
        onClick={() => setCurrentView('profile')}
      >
        👤
        <span>Profile</span>
      </button>
      <button 
        className={`nav-btn ${currentView === 'settings' ? 'active' : ''}`}
        onClick={() => setCurrentView('settings')}
      >
        ⚙️
        <span>Settings</span>
      </button>
    </nav>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Present Breathwork</h1>
        <p className="subtitle">Your personal wellness companion</p>
      </header>

      <main className="app-main">
        {currentView === 'home' && <HomeView />}
        {currentView === 'categories' && <CategoryView />}
        {currentView === 'exercise' && !showFeedback && <ExerciseView />}
        {showFeedback && <FeedbackView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'settings' && <SettingsView />}
      </main>

      {currentView !== 'exercise' && !showFeedback && <Navigation />}
    </div>
  );
};

export default App;