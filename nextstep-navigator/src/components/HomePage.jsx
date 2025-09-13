import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticFiles/HomePage.css";
import Logo from "../assets/logo.webp";
import animationData from "../assets/animation/manWalking.json";
import { FaQuestionCircle, FaBriefcase, FaBook, FaStar } from "react-icons/fa";
import useSimulatedVisitors from "../hooks/useSimulatedVisitors";

const codeElements = [
  "NextStep", "Navigator", "Career", "Success", "Growth", "Future",
  "Dreams", "Opportunities", "Innovation", "Skills", "Goals", "Journey",
  "Mentorship", "Learning", "Resilience", "Focus", "Inspiration", "Teamwork",
  "Leadership", "Impact", "Networking", "Strategy", "Empower", "Vision",
  "Adaptability", "Excellence", "Motivation", "Progress", "Achievement", "Pathway"
];

function formatNumber(n) {
  return n.toLocaleString();
}

function LandingPage({ onLogin }) {
  const navigate = useNavigate();
  const backgroundParticles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      text: codeElements[Math.floor(Math.random() * codeElements.length)],
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 5 + 8}s`,
      },
    }));
  }, []);

  const handleNavClick = (e, page) => {
    e.preventDefault();
    if (onLogin) onLogin();
    navigate(`/${page}`);
    window.scrollTo(0, 0);
  };

  const { displayCount, liveViewers } = useSimulatedVisitors();
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    let frame;
    let start;
    const from = 0;
    const to = displayCount;
    const duration = 1200;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedCount(Math.floor(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [displayCount]);

  const features = [
    { icon: <FaQuestionCircle />, title: "Interest-Based Quiz", desc: "Answer a few simple questions to get personalized career recommendations.", page: "quiz" },
    { icon: <FaBriefcase />, title: "Dynamic Career Bank", desc: "Explore hundreds of detailed career profiles with salary insights and more.", page: "careerBank" },
    { icon: <FaBook />, title: "Resource Library", desc: "Access curated articles, e-books, and templates to guide you.", page: "resources" },
    { icon: <FaStar />, title: "Success Stories", desc: "Get inspired by real-life journeys of professionals.", page: "successStories" },
  ];

  return (
    <>
      <div id="code-container">
        {backgroundParticles.map((p) => (
          <span key={p.id} className="code-particle" style={p.style}>
            {p.text}
          </span>
        ))}
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center landing-bg position-relative overflow-hidden">
        <div className="container position-relative z-2">
          <div className="row align-items-center hero-section">
            <div className="col-lg-6 order-lg-1 order-2 text-center text-lg-start" data-aos="fade-right" data-aos-delay="300">
              <div className="hero-content">
                <img src={Logo} alt="NextStep Navigator Logo" className="mb-4 fade-in landing-logo" />
                <h1 className="display-3 fw-bold text-primary mb-3 slide-in-left landing-title">
                  NextStep <span style={{ color: "#31a8cc" }}>Navigator</span>
                </h1>
                <h2 className="fw-normal text-secondary mb-4 fade-in landing-subtitle">
                  Your Guide to the Future
                </h2>
                <p className="lead text-muted mb-4 landing-description">
                  Discover your path forward with personalized guidance and actionable insights.
                </p>

                <div className="visitor-counter-card mb-3">
                  <div className="visitor-stats">
                    <div className="small text-muted">Total Visits</div>
                    <div className="h5 mb-0 fw-bold">{formatNumber(animatedCount)}</div>
                  </div>
                  <div className="vr mx-2 d-none d-sm-block" />
                  <div className="visitor-live text-end">
                    <div className="small text-muted">Live Now</div>
                    <div className="h6 mb-0 fw-semibold text-primary">{formatNumber(liveViewers)}</div>
                  </div>
                </div>

                <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
                  <button
                    className="btn btn-primary btn-lg px-4 py-2 rounded-pill hover-lift"
                    onClick={(e) => handleNavClick(e, "quiz")}
                  >
                    Take the Quiz
                  </button>
                  <button
                    className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill shadow-sm hover-lift"
                    onClick={(e) => handleNavClick(e, "careerBank")}
                  >
                    Explore Careers
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 order-lg-2 order-1 text-center d-none d-lg-block" data-aos="fade-left" data-aos-delay="500">
              <div className="hero-animation-container">
                <Lottie animationData={animationData} loop className="hero-animation" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center d-block d-lg-none my-4">
        <Lottie animationData={animationData} loop className="hero-animation" />
      </div>

      <section className="features-section py-5" data-aos="fade-up" data-aos-delay="200">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold" data-aos="zoom-in" data-aos-delay="500">
              Unlock Your Potential
            </h2>
            <p className="lead text-muted" data-aos="fade-right" data-aos-delay="500">
              Everything you need to find your dream career is right here.
            </p>
          </div>

          <div className="row g-4" data-aos="fade-right" data-aos-delay="500">
            {features.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3 d-flex">
                <div className="feature-card text-center p-4">
                  <div className="feature-icon mb-3 mx-auto">{f.icon}</div>
                  <h5 className="fw-bold">{f.title}</h5>
                  <p className="text-muted">{f.desc}</p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill"
                      onClick={(e) => handleNavClick(e, f.page)}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
