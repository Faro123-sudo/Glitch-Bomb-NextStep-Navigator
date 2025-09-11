import React from "react";
import data from "../data/careerData.json";
import "./AdmissionAndCoaching.css"; 

export default function AdmissionAndCoaching() {
  return (
    <section className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">Admission & Coaching 🎓</h1>
      <div className="row g-4 justify-content-center">
        {data.admissionAndCoaching.guidanceTopics.map((topic) => (
          <div key={topic.id} className="col-lg-6">
            <div className="card h-100 shadow-lg border-0 admission-card">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">{topic.title}</h5>
                <p className="card-text">{topic.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}