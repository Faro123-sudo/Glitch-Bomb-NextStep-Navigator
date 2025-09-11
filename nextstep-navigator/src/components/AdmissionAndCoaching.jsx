import React from "react";
import data from "../data/careerData.json";
import "./AdmissionAndCoaching.css";

export default function AdmissionAndCoaching() {
  return (
    <section className="container py-5">
      <h1 className="text-center mb-3 display-4 fw-bold text-primary">
        Admission & Coaching{" "}
        <span role="img" aria-label="graduation">
          🎓
        </span>
      </h1>
      <p className="text-center text-muted mb-5 fs-5">
        Get expert guidance on stream selection, study abroad, interviews, and
        resume building. Start your journey with confidence!
      </p>
      <div className="row g-4 justify-content-center">
        {data.admissionAndCoaching.guidanceTopics.map((topic, idx) => (
          <div key={topic.id} className="col-lg-6">
            <div
              className="card h-100 shadow-lg border-0 admission-card position-relative"
              style={{
                animation: "fadeInUp 0.5s",
                animationDelay: `${idx * 0.08}s`,
                animationFillMode: "both",
              }}
            >
              <div className="card-body">
                <div className="admission-icon mb-3">
                  <i className={topic.icon}></i>
                </div>
                <h5 className="card-title fw-bold mb-3">{topic.title}</h5>
                <p className="card-text">{topic.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <button className="btn btn-primary rounded-pill px-4 py-2">
          <i className="fa-solid fa-comments me-2"></i>Ask for Personalized Guidance
        </button>
        <p className="text-muted mt-2 small">
          Need help choosing your path? Reach out to our experts!
        </p>
      </div>
    </section>
  );
}