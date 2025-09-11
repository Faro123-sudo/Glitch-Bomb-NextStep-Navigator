import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticFiles/landingPage.css";

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
      <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 position-relative">
        <div id="code-container"></div>

        <div className="container position-relative">
          <div className="row justify-content-center">
            {/* Header */}
            <div className="col-12 text-center mb-4" data-aos="fade-up" data-aos-delay="300">
              <h1
                className="display-4 fw-bold text-primary mb-3"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                Welcome to NextStep Navigator
              </h1>
              <h2 className="fw-semibold text-secondary">
                Your Guide to the Future
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
