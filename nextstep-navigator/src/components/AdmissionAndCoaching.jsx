import React from "react";
import data from "../data/careerData.json";
import "./AdmissionAndCoaching.css";

export default function AdmissionAndCoaching({ userType = "student" }) {
  const filteredTopics = data.admissionAndCoaching.guidanceTopics.filter(
    (topic) => topic.userType === userType
  );

  return (
    <section className="container py-5">
      <h1
        className="text-center mb-3 display-4 fw-bold text-primary"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        Admission & Coaching{" "}
        <span role="img" aria-label="graduation">
          🎓
        </span>
      </h1>
      <p
        className="text-center text-muted mb-5 fs-5"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        Get expert guidance on stream selection, study abroad, interviews, and
        resume building. Start your journey with confidence!
      </p>

      <div className="row g-4 justify-content-center">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, idx) => (
            <div
              key={topic.id}
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              data-aos-duration="600"
            >
              <div className="card h-100 shadow-lg border-0 admission-card position-relative">
                <div className="card-body">
                  <div className="admission-icon mb-3">
                    <i className={topic.icon}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">{topic.title}</h5>
                  <p className="card-text">{topic.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted" data-aos="fade-up">
            No guidance topics available for this user type.
          </p>
        )}
      </div>

      <div className="text-center mt-5" data-aos="zoom-in" data-aos-delay="300">
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
