import React from "react";
import data from "../data/careerData.json";
import './SuccessStories.css';

export default function SuccessStories() {
  return (
    <section className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">Success Stories</h1>
      <div className="row g-4">
        {data.successStories.map((story) => (
          <div key={story.id} className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-lg border-0 success-story-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-2">{story.name}</h5>
                <h6 className="card-subtitle mb-3 text-muted">{story.career}</h6>
                <p className="card-text flex-grow-1">{story.story}</p>
                <div className="mt-auto pt-3">
                  <a href="#" className="btn btn-outline-primary rounded-pill btn-sm">Read More</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}