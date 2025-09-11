import React, { useEffect } from "react";
import Lottie from "lottie-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticFiles/HomePage.css";
import Logo from "../assets/logo.webp";
import animationData from "../assets/animation/manWalking.json";

function LandingPage() {
  useEffect(() => {
    const codeElements = [
      "NextStep", "Navigator", "Career", "Success", "Growth", "Future", 
      "Dreams", "Opportunities", "Innovation", "Skills", "Goals", "Journey", 
      "Mentorship", "Learning", "Resilience", "Focus", "Inspiration", "Teamwork", 
      "Leadership", "Impact", "Networking", "Strategy", "Empower", "Vision", 
      "Adaptability", "Excellence", "Motivation", "Progress", "Achievement", "Pathway"
    ];

    const container = document.getElementById("code-container");

    if (container) {
      container.innerHTML = "";
      for (let i = 0; i < 30; i++) {
        const span = document.createElement("span");
        span.className = "code-particle";
        span.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
        span.style.left = Math.random() * 100 + "%";
        span.style.animationDelay = Math.random() * 10 + "s";
        span.style.animationDuration = (Math.random() * 5 + 8) + "s";
        container.appendChild(span);
      }
    }
  }, []);

  return (  
    <>
  <div id="code-container"></div>
    <div className="d-flex flex-column align-items-center justify-content-center landing-bg position-absolute top-0 start-0 h-100 w-100 overflow-hidden">
    
      <div className="container position-relative z-2">
        <div className="row align-items-center min-vh-100 py-5">
          {/* Left Content */}
          <div className="col-lg-6 order-lg-1 order-2" data-aos="fade-right" data-aos-delay="300">
            <div className="mb-4 text-center text-lg-start">
              <img 
                src={Logo} 
                alt="NextStep Navigator Logo" 
                className="mb-4 fade-in" 
                style={{ height: '70px' }}
              />
              <h1 className="display-3 fw-bold text-primary mb-3 slide-in-left">
                NextStep <span className="text-accent">Navigator</span>
              </h1>
              <h2 className="fw-semibold text-secondary mb-4 fade-in">
                Your Guide to the Future
              </h2>
              <p className="lead text-muted mb-4">
                Discover your path forward with personalized guidance and actionable insights to reach your career and educational goals.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button className="btn btn-primary btn-lg px-4 py-2 rounded-pill shadow hover-lift">
                  Get Started
                </button>
                <button className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill shadow-sm hover-lift">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Right Content (Animation) */}
          <div className="col-lg-6 order-lg-2 order-1 text-center mb-5 mb-lg-0" data-aos="fade-left" data-aos-delay="500">
            <div className="hero-animation-container">
              <Lottie 
                animationData={animationData} 
                loop={true} 
                className="hero-animation"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Optional) */}
      {/* <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 z-3">
        <div className="scroll-indicator-container">
          <div className="scroll-text text-muted small mb-1">Scroll to explore</div>
          <div className="lottie-arrow-container">
            <Lottie 
              animationData={arrowDown} 
              loop={true}
              className="lottie-arrow"
            />
          </div>
        </div>
      </div> */}
    </div>
    </>
  );
}

export default LandingPage;
