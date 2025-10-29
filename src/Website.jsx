import React, { useState, useEffect } from 'react';
import './Website.css';

const Website = ({ onTryApp }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'features', 'exercises', 'how-it-works', 'testimonials', 'download'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="website">
      {/* Navigation */}
      <nav className={`website-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon-small">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M 12 20 Q 20 12, 28 20" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span>Present Breathwork</span>
          </div>
          <div className="nav-links">
            <a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a>
            <a href="#features" className={activeSection === 'features' ? 'active' : ''}>Features</a>
            <a href="#exercises" className={activeSection === 'exercises' ? 'active' : ''}>Exercises</a>
            <a href="#how-it-works" className={activeSection === 'how-it-works' ? 'active' : ''}>How It Works</a>
            <a href="#testimonials" className={activeSection === 'testimonials' ? 'active' : ''}>Reviews</a>
            <button onClick={() => scrollToSection('download')} className="nav-cta">Try It Free</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="breathing-animation-hero">
            <div className="circle-hero circle-1"></div>
            <div className="circle-hero circle-2"></div>
            <div className="circle-hero circle-3"></div>
            <div className="logo-center-hero">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="3"/>
                <path d="M 30 50 Q 50 30, 70 50 T 70 70" fill="none" stroke="white" strokeWidth="3"/>
              </svg>
            </div>
          </div>
          <h1 className="hero-title">Find Your Calm<br/>One Breath at a Time</h1>
          <p className="hero-subtitle">
            Transform stress into serenity with guided breathing exercises designed for modern life
          </p>
          <div className="hero-buttons">
            <button onClick={onTryApp} className="hero-btn primary">
              Try Interactive Demo
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="hero-btn secondary">
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Sessions Daily</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Present Breathwork?</h2>
          <p className="section-subtitle">Everything you need to master your breath and mind</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧘</div>
              <h3>17 Guided Exercises</h3>
              <p>From quick 30-second resets to deep 5-minute sessions, find the perfect practice for any moment</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Categories</h3>
              <p>Exercises organized by your needs: Stress Relief, Energy Boost, Sleep Preparation, and more</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Your Progress</h3>
              <p>See your wellness journey unfold with detailed metrics, streaks, and achievements</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔊</div>
              <h3>Audio Guidance</h3>
              <p>Gentle audio cues guide you through each breath with soothing tones</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Mode</h3>
              <p>In a rush? Every exercise has a quick version for busy moments</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Simple Feedback</h3>
              <p>Quick check-ins help you understand what works best for you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Showcase */}
      <section id="exercises" className="exercises-section">
        <div className="section-container">
          <h2 className="section-title">Breathing Techniques for Every Need</h2>
          <p className="section-subtitle">Science-backed exercises used by Navy SEALs, meditation experts, and wellness professionals</p>
          
          <div className="exercises-showcase">
            <div className="exercise-showcase-card">
              <div className="exercise-badge stress">Stress & Anxiety</div>
              <h3>Box Breathing</h3>
              <p>The Navy SEAL technique for instant calm. Perfect for high-pressure moments.</p>
              <div className="exercise-duration">1-2 minutes</div>
            </div>
            
            <div className="exercise-showcase-card">
              <div className="exercise-badge energy">Energy Boost</div>
              <h3>Power Breath</h3>
              <p>Quick energy surge to wake up your body and sharpen your mind.</p>
              <div className="exercise-duration">30-60 seconds</div>
            </div>
            
            <div className="exercise-showcase-card">
              <div className="exercise-badge sleep">Sleep</div>
              <h3>4-7-8 Breathing</h3>
              <p>Dr. Weil's natural tranquilizer. Fall asleep faster and deeper.</p>
              <div className="exercise-duration">2-4 minutes</div>
            </div>
            
            <div className="exercise-showcase-card">
              <div className="exercise-badge everyday">Daily Practice</div>
              <h3>Deep Belly Breath</h3>
              <p>Activate your calm nervous system for lasting peace.</p>
              <div className="exercise-duration">1-2 minutes</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-section">
        <div className="section-container">
          <h2 className="section-title">Simple. Effective. Life-Changing.</h2>
          
          <div className="how-steps">
            <div className="how-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Choose Your Need</h3>
                <p>Select from 5 categories: Stress, Energy, Sleep, Mood, or Daily Wellness</p>
              </div>
            </div>
            
            <div className="how-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Pick Your Duration</h3>
                <p>Quick mode for 30-90 seconds or full sessions for deeper practice</p>
              </div>
            </div>
            
            <div className="how-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Breathe & Transform</h3>
                <p>Follow the animated guide with audio cues. Feel the difference instantly</p>
              </div>
            </div>
            
            <div className="how-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Track Your Growth</h3>
                <p>See your progress, build streaks, and watch your wellness improve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">Loved by Thousands</h2>
          <p className="section-subtitle">Real stories from our community</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"This app changed my life. I use it every morning and before big meetings. The box breathing is incredible!"</p>
              <div className="testimonial-author">
                <strong>Sarah M.</strong>
                <span>Product Manager</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"Finally, a breathwork app that's actually simple to use. The quick modes are perfect for my busy schedule."</p>
              <div className="testimonial-author">
                <strong>James K.</strong>
                <span>Entrepreneur</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"The sleep exercises are magic. I fall asleep so much faster now. Best wellness app I've ever used."</p>
              <div className="testimonial-author">
                <strong>Maya L.</strong>
                <span>Teacher</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download/CTA Section */}
      <section id="download" className="download-section">
        <div className="section-container">
          <div className="download-content">
            <h2>Ready to Transform Your Life?</h2>
            <p>Start your breathwork journey today. Free to use, no signup required.</p>
            <button onClick={onTryApp} className="download-btn">
              Try Interactive Demo
            </button>
            <div className="download-note">
              ✨ Works on all devices • No installation needed • Always free
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="website-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon-small">
                <svg viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 12 20 Q 20 12, 28 20" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span>Present Breathwork</span>
            </div>
            <p>Find your calm, one breath at a time.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#features">Features</a>
            <a href="#exercises">Exercises</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <a href="#testimonials">Testimonials</a>
            <a href="#download">Get Started</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Present Breathwork. Made with ❤️ for your wellness.</p>
        </div>
      </footer>
    </div>
  );
};

export default Website;

