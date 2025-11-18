import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [showFeedback, setShowFeedback] = useState(false);

  const intervalRef = useRef(null);
  const phaseIntervalRef = useRef(null);

  // Soothing color palette for mental health
  const categories = {
    breathing: {
      name: 'Breathing',
      icon: '🌬️',
      description: 'Guided breathwork exercises',
      color: '#6B9BD1', // Soft blue
      exercises: ['boxBreathing', 'deepBelly', 'calming478', 'equalBreath']
    },
    grounding: {
      name: 'Grounding',
      icon: '🌿',
      description: 'Present moment awareness',
      color: '#7FB069', // Soft green
      exercises: ['fiveSenses', 'bodyScan', 'mindfulPause', 'progressiveRelaxation']
    },
    calm: {
      name: 'Calm',
      icon: '💙',
      description: 'Find peace and stillness',
      color: '#9B8FB8', // Soft purple
      exercises: ['anxietyRelief', 'eveningCalm', 'deepRelaxation']
    },
    energy: {
      name: 'Energy',
      icon: '☀️',
      description: 'Boost focus and alertness',
      color: '#F4A460', // Soft orange
      exercises: ['energizingBreath', 'powerBreath', 'morningBoost']
    }
  };

  const exercises = {
    // BREATHING (No headphones needed)
    boxBreathing: {
      name: 'Box Breathing',
      duration: 120,
      quickDuration: 60,
      category: 'breathing',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose' },
        { name: 'Hold', duration: 4, instruction: 'Hold gently' },
        { name: 'Exhale', duration: 4, instruction: 'Release slowly through your mouth' },
        { name: 'Hold', duration: 4, instruction: 'Pause empty' }
      ],
      description: 'Navy SEAL technique for instant calm',
      benefits: 'Reduces stress, anxiety, and panic'
    },
    deepBelly: {
      name: 'Deep Belly Breath',
      duration: 120,
      quickDuration: 60,
      category: 'breathing',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Breathe deeply into your belly' },
        { name: 'Exhale', duration: 7, instruction: 'Release completely' }
      ],
      description: 'Activate your calm nervous system',
      benefits: 'Lowers heart rate, reduces stress'
    },
    calming478: {
      name: '4-7-8 Breathing',
      duration: 90,
      quickDuration: 45,
      category: 'breathing',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in through nose' },
        { name: 'Hold', duration: 7, instruction: 'Hold the breath' },
        { name: 'Exhale', duration: 8, instruction: 'Exhale through mouth' }
      ],
      description: 'Dr. Weil\'s natural tranquilizer',
      benefits: 'Calms anxiety, stops panic attacks'
    },
    equalBreath: {
      name: 'Equal Breath',
      duration: 90,
      quickDuration: 45,
      category: 'breathing',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly' },
        { name: 'Exhale', duration: 4, instruction: 'Breathe out slowly' }
      ],
      description: 'Balanced breathing for balance',
      benefits: 'Centers the mind, creates equilibrium'
    },

    // GROUNDING EXERCISES
    fiveSenses: {
      name: '5-4-3-2-1 Grounding',
      duration: 180,
      quickDuration: 90,
      category: 'grounding',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Notice', duration: 30, instruction: '5 things you see' },
        { name: 'Notice', duration: 30, instruction: '4 things you feel' },
        { name: 'Notice', duration: 30, instruction: '3 things you hear' },
        { name: 'Notice', duration: 30, instruction: '2 things you smell' },
        { name: 'Notice', duration: 30, instruction: '1 thing you taste' }
      ],
      description: 'Ground yourself using your five senses',
      benefits: 'Brings you to the present moment'
    },
    bodyScan: {
      name: 'Body Scan',
      duration: 240,
      quickDuration: 120,
      category: 'grounding',
      needsHeadphones: true,
      publicFriendly: false,
      phases: [
        { name: 'Scan', duration: 40, instruction: 'Notice your toes' },
        { name: 'Scan', duration: 40, instruction: 'Notice your legs' },
        { name: 'Scan', duration: 40, instruction: 'Notice your torso' },
        { name: 'Scan', duration: 40, instruction: 'Notice your arms' },
        { name: 'Scan', duration: 40, instruction: 'Notice your head' }
      ],
      description: 'Mindful body awareness practice',
      benefits: 'Releases tension, increases body awareness'
    },
    mindfulPause: {
      name: 'Mindful Pause',
      duration: 120,
      quickDuration: 60,
      category: 'grounding',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Pause', duration: 30, instruction: 'Simply observe your breath' }
      ],
      description: 'Return to the present moment',
      benefits: 'Grounds you, improves awareness'
    },
    progressiveRelaxation: {
      name: 'Progressive Relaxation',
      duration: 300,
      quickDuration: 150,
      category: 'grounding',
      needsHeadphones: true,
      publicFriendly: false,
      phases: [
        { name: 'Tense', duration: 5, instruction: 'Tense your feet, then release' },
        { name: 'Tense', duration: 5, instruction: 'Tense your legs, then release' },
        { name: 'Tense', duration: 5, instruction: 'Tense your hands, then release' },
        { name: 'Tense', duration: 5, instruction: 'Tense your shoulders, then release' }
      ],
      description: 'Release tension through your body',
      benefits: 'Deep relaxation, stress relief'
    },

    // CALM EXERCISES
    anxietyRelief: {
      name: 'Anxiety Relief',
      duration: 180,
      quickDuration: 90,
      category: 'calm',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 3, instruction: 'Slow, gentle inhale' },
        { name: 'Exhale', duration: 6, instruction: 'Long, slow exhale' }
      ],
      description: 'Extended exhales for deep calm',
      benefits: 'Stops racing thoughts, releases tension'
    },
    eveningCalm: {
      name: 'Evening Calm',
      duration: 180,
      quickDuration: 90,
      category: 'calm',
      needsHeadphones: false,
      publicFriendly: true,
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
      category: 'calm',
      needsHeadphones: true,
      publicFriendly: false,
      phases: [
        { name: 'Inhale', duration: 6, instruction: 'Deep, slow breath' },
        { name: 'Exhale', duration: 10, instruction: 'Complete release' }
      ],
      description: 'Full body and mind relaxation',
      benefits: 'Deep calm, profound rest'
    },

    // ENERGY EXERCISES
    energizingBreath: {
      name: 'Energizing Breath',
      duration: 90,
      quickDuration: 45,
      category: 'energy',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 2, instruction: 'Quick, energizing inhale' },
        { name: 'Exhale', duration: 2, instruction: 'Powerful exhale' }
      ],
      description: 'Wake up your body and mind',
      benefits: 'Increases energy, lifts mood'
    },
    powerBreath: {
      name: 'Power Breath',
      duration: 60,
      quickDuration: 30,
      category: 'energy',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 1, instruction: 'Sharp inhale' },
        { name: 'Exhale', duration: 1, instruction: 'Forceful exhale' }
      ],
      description: 'Instant energy surge',
      benefits: 'Wakes you up, increases alertness'
    },
    morningBoost: {
      name: 'Morning Boost',
      duration: 120,
      quickDuration: 60,
      category: 'energy',
      needsHeadphones: false,
      publicFriendly: true,
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Wake up your body' },
        { name: 'Hold', duration: 2, instruction: 'Feel alive' },
        { name: 'Exhale', duration: 4, instruction: 'Start fresh' }
      ],
      description: 'Perfect way to start your day',
      benefits: 'Increases alertness, sets positive tone'
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
      id: 'helpful',
      question: 'Was this session helpful?',
      options: ['Very helpful', 'Helpful', 'Somewhat', 'Not really']
    }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedMetrics = localStorage.getItem('breathworkMetrics');
    if (savedMetrics) {
      // Load if needed
    }
  }, []);

  // Start exercise
  const startExercise = (exerciseKey, isQuick = false) => {
    const exercise = exercises[exerciseKey];
    const duration = isQuick ? exercise.quickDuration : exercise.duration;
    
    setCurrentExercise({ key: exerciseKey, ...exercise, actualDuration: duration });
    setTimeLeft(duration);
    setIsActive(true);
    setBreathPhase('inhale');
    setCurrentView('exercise');
  };

  // Stop exercise
  const stopExercise = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
    setShowFeedback(true);
  };

  const completeFeedback = (answers) => {
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
        }
      }, 100);

      return () => {
        if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
      };
    }
  }, [isActive, currentExercise]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Home View
  const HomeView = () => (
    <div className="home-view">
      <div className="welcome-section">
        <h1>Present</h1>
        <p>Find your calm, one breath at a time</p>
      </div>

      <div className="categories-grid">
        {Object.entries(categories).map(([key, category]) => (
          <div 
            key={key}
            className="category-card"
            style={{ borderLeftColor: category.color }}
            onClick={() => {
              setSelectedCategory(key);
              setCurrentView('category');
            }}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div className="category-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Category View
  const CategoryView = () => {
    const category = categories[selectedCategory];
    const categoryExercises = category.exercises.map(key => ({
      key,
      ...exercises[key]
    }));

    return (
      <div className="category-view">
        <div className="category-header">
          <button className="back-btn" onClick={() => setCurrentView('home')}>
            ←
          </button>
          <h2>{category.name}</h2>
        </div>

        <div className="exercises-list">
          {categoryExercises.map((exercise) => (
            <div key={exercise.key} className="exercise-item">
              <div className="exercise-header">
                <h3>{exercise.name}</h3>
                <div className="exercise-badges">
                  {!exercise.needsHeadphones && (
                    <span className="badge no-headphones">No headphones</span>
                  )}
                  {exercise.publicFriendly && (
                    <span className="badge public">Public friendly</span>
                  )}
                </div>
              </div>
              <p className="exercise-desc">{exercise.description}</p>
              <div className="exercise-actions">
                <button 
                  className="start-btn quick"
                  onClick={() => startExercise(exercise.key, true)}
                >
                  Quick
                </button>
                <button 
                  className="start-btn full"
                  onClick={() => startExercise(exercise.key, false)}
                >
                  Full
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Exercise View
  const ExerciseView = () => {
    const currentPhase = currentExercise?.phases.find(p => 
      p.name.toLowerCase().replace(' ', '') === breathPhase
    ) || currentExercise?.phases[0];

    return (
      <div className="exercise-active">
        <div className="exercise-top-bar">
          <button className="back-btn" onClick={stopExercise}>←</button>
          <div className="timer-display">{formatTime(timeLeft)}</div>
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

  // Feedback View
  const FeedbackView = () => {
    const [answers, setAnswers] = useState({});

    const handleAnswer = (questionId, answer) => {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const isComplete = Object.keys(answers).length === feedbackQuestions.length;

    return (
      <div className="feedback-view">
        <div className="feedback-header">
          <h2>How did it go?</h2>
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
          <button className="skip-btn" onClick={skipFeedback}>Skip</button>
          <button 
            className="done-btn"
            onClick={() => completeFeedback(answers)}
            disabled={!isComplete}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {currentView === 'home' && <HomeView />}
      {currentView === 'category' && <CategoryView />}
      {currentView === 'exercise' && !showFeedback && <ExerciseView />}
      {showFeedback && <FeedbackView />}
    </div>
  );
};

export default App;
