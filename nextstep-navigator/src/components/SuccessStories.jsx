import React, { useState } from "react";
import data from "../data/careerData.json";
import './SuccessStories.css';

// Extract unique domains from stories
const domains = [
  "All",
  ...Array.from(new Set(data.successStories.map(story => story.domain)))
];

export default function SuccessStories() {
  const [selectedDomain, setSelectedDomain] = useState("All");

  const filteredStories = selectedDomain === "All"
    ? data.successStories
    : data.successStories.filter(story => story.domain === selectedDomain);

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4 display-4 fw-bold text-primary">Success Stories</h1>
      <p className="text-center text-muted mb-5 fs-5">
        Explore real journeys from diverse fields. Filter by domain to find stories that inspire you!
      </p>
      {/* Domain Filter as Pills */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {domains.map(domain => (
          <button
            key={domain}
            className={`btn rounded-pill px-4 py-2 fw-semibold domain-pill ${
              selectedDomain === domain ? "btn-primary text-white" : "btn-outline-primary"
            }`}
            style={{ minWidth: 120, transition: "all 0.2s" }}
            onClick={() => setSelectedDomain(domain)}
          >
            {domain}
          </button>
        ))}
      </div>
      {/* Stories Grid */}
      <div className="row g-4">
        {filteredStories.map((story, idx) => (
          <div
            key={story.id}
            className="col-lg-4 col-md-6"
            style={{
              animation: "fadeInUp 0.5s",
              animationDelay: `${idx * 0.08}s`,
              animationFillMode: "both"
            }}
          >
            <div className="card h-100 shadow-lg border-0 success-story-card position-relative">
              {/* Domain Tag */}
              <span className="badge bg-secondary position-absolute top-0 start-0 m-3 domain-badge">
                {story.domain}
              </span>
              {story.photo && (
                <img
                  src={story.photo}
                  alt={story.name}
                  className="card-img-top object-fit-cover mx-auto"
                  style={{ height: "220px", objectFit: "cover", maxWidth: "100%" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-1">{story.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{story.career}</h6>
                <p className="card-text flex-grow-1">{story.story}</p>
                <div className="mt-auto pt-3">
                  <a href="#" className="btn btn-outline-primary rounded-pill btn-sm">Read More</a>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredStories.length === 0 && (
          <div className="col-12 text-center text-muted py-5">
            No stories found for this domain.
          </div>
        )}
      </div>
    </section>
  );
}