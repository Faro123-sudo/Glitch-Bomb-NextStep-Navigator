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
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">Success Stories</h1>
      {/* Domain Filter */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <select
            className="form-select form-select-lg"
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
          >
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Stories Grid */}
      <div className="row g-4">
        {filteredStories.map((story) => (
          <div key={story.id} className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-lg border-0 success-story-card">
              {story.photo && (
                <img
                  src={story.photo}
                  alt={story.name}
                  className="card-img-top object-fit-cover"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-2">{story.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{story.career}</h6>
                {/* <span className="badge bg-secondary mb-3 align-self-start">{story.domain}</span> */}
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