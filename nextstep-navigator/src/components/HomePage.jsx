import React, { useMemo } from "react";
import Lottie from "lottie-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticFiles/HomePage.css";
import Logo from "../assets/logo.webp";
import animationData from "../assets/animation/manWalking.json";
import { FaQuestionCircle, FaBriefcase, FaBook, FaStar } from "react-icons/fa";

const codeElements = [
  "NextStep", "Navigator", "Career", "Success", "Growth", "Future",
  "Dreams", "Opportunities", "Innovation", "Skills", "Goals", "Journey",
  "Mentorship", "Learning", "Resilience", "Focus", "Inspiration", "Teamwork",
  "Leadership", "Impact", "Networking", "Strategy", "Empower", "Vision",
  "Adaptability", "Excellence", "Motivation", "Progress", "Achievement", "Pathway"
];

function LandingPage() {
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
            <div
              className="col-lg-6 order-lg-1 order-2 text-center text-lg-start"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="hero-content">
                <img
                  src={Logo}
                  alt="NextStep Navigator Logo"
                  className="mb-4 fade-in landing-logo"
                />
                <h1 className="display-3 fw-bold text-primary mb-3 slide-in-left landing-title">
                  NextStep <span style={{ color: "#31a8cc" }}>Navigator</span>
                </h1>
                <h2 className="fw-normal text-secondary mb-4 fade-in landing-subtitle">
                  Your Guide to the Future
                </h2>
                <p className="lead text-muted mb-4 landing-description">
                  Discover your path forward with personalized guidance and actionable insights to reach your career and educational goals.
                </p>
                <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
                  <button className="btn btn-primary btn-lg px-4 py-2 rounded-pill shadow hover-lift">
                    Take the Quiz
                  </button>
                  <button className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill shadow-sm hover-lift">
                    Explore Careers
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop view */}
            <div
              className="col-lg-6 order-lg-2 order-1 text-center d-none d-lg-block"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <div className="hero-animation-container">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="hero-animation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Mobile devices */}
      <div className="text-center d-block d-lg-none my-4">
        <Lottie
          animationData={animationData}
          loop={true}
          className="hero-animation"
        />
      </div>

      <section className="features-section py-5" data-aos="fade-up" data-aos-delay="200">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold" data-aos="zoom-in" data-aos-delay="500">Unlock Your Potential</h2>
            <p className="lead text-muted" data-aos="slide-right" data-aos-delay="500">
              Everything you need to find your dream career is right here.
            </p>
          </div>
          <div className="row g-4" data-aos="fade-right" data-aos-delay="500">
            <div className="col-md-6 col-lg-3 d-flex">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 mx-auto">
                  <FaQuestionCircle />
                </div>
                <h5 className="fw-bold">Interest-Based Quiz</h5>
                <p className="text-muted">
                  Answer a few simple questions to get personalized career recommendations that match your passions.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 mx-auto">
                  <FaBriefcase />
                </div>
                <h5 className="fw-bold">Dynamic Career Bank</h5>
                <p className="text-muted">
                  Explore hundreds of detailed career profiles with salary insights, required skills, and more.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 mx-auto">
                  <FaBook />
                </div>
                <h5 className="fw-bold">Resource Library</h5>
                <p className="text-muted">
                  Access a curated collection of articles, e-books, and templates to help you on your journey.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 mx-auto">
                  <FaStar />
                </div>
                <h5 className="fw-bold">Success Stories</h5>
                <p className="text-muted">
                  Get inspired by the real-life journeys of professionals who found their path with our guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
