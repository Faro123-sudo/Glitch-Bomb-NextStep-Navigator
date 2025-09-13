import React, { useState, useEffect } from "react";
import defaultData from "../data/careerData.json";
import "./SuccessStories.css";

const domains = [
  "All",
  ...Array.from(new Set(defaultData.successStories.map((story) => story.domain))),
];

export default function SuccessStories({ userType = "" }) {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [showRecommended, setShowRecommended] = useState(!!userType);
  const [stories, setStories] = useState(defaultData.successStories);

  useEffect(() => {
    setStories(defaultData.successStories);
  }, []);

  const filteredStories = stories
    .map((story) => {
      const audiences = Array.isArray(story.audiences)
        ? story.audiences.map((a) => a.toLowerCase())
        : [];
      const recommended = userType
        ? audiences.includes(userType.toLowerCase())
        : false;
      return { ...story, recommended };
    })
    .filter((story) => {
      const matchesDomain = selectedDomain === "All" || story.domain === selectedDomain;
      const matchesAudience = !showRecommended || story.recommended;
      return matchesDomain && matchesAudience;
    });

  return (
    <section className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary" data-aos="fade-down">
        Success Stories
      </h1>

      <div className="row mb-4 justify-content-center" data-aos="fade-up" data-aos-delay="100">
        <div className="col-md-4 mb-3">
          <select
            className="form-select form-select-lg"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {userType && (
          <div className="col-md-4 mb-3 text-center">
            <button
              className={`btn btn-${showRecommended ? "primary" : "outline-primary"} w-100`}
              onClick={() => setShowRecommended((prev) => !prev)}
            >
              {showRecommended
                ? `Showing: Recommended for ${userType}`
                : "Showing: All Stories"}
            </button>
          </div>
        )}
      </div>

      <div className="row g-4" data-aos="fade-up" data-aos-delay="200">
        {filteredStories.length > 0 ? (
          filteredStories.map((story, idx) => (
            <div
              key={story.id}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="card h-100 shadow-lg border-0 success-story-card position-relative">
                <span className="badge bg-secondary position-absolute top-0 start-0 m-3 domain-badge">
                  {story.domain}
                </span>

                {story.recommended && (
                  <span className="badge bg-primary position-absolute top-0 end-0 m-3">
                    Recommended
                  </span>
                )}

                {story.photo && (
                  <img
                    src={story.photo}
                    alt={story.name}
                    className="card-img-top object-fit-cover mx-auto"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      maxWidth: "100%",
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-1">{story.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{story.career}</h6>
                  <p className="card-text flex-grow-1">{story.story}</p>
                  <div className="mt-auto pt-3">
                    <a href="#" className="btn btn-outline-primary rounded-pill btn-sm">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted py-5" data-aos="zoom-in">
            No stories found for this selection.
          </div>
        )}
      </div>
    </section>
  );
}
