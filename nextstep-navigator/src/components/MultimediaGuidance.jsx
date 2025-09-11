import React from "react";
import data from "../data/careerData.json";
import "./MultimediaGuidance.css";

export default function MultimediaGuidance() {
  return (
    <section className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-dark">
        Multimedia Guidance
      </h1>

      <div className="row g-4 justify-content-center">
        
        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100 multimedia-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-play-circle-fill me-2"></i>Videos
              </h2>
              <ul className="list-group list-group-flush">
                {data.multimediaGuidance.videos.map((video) => (
                  <li key={video.id} className="list-group-item">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none d-block py-2"
                    >
                      {video.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        
        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100 multimedia-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-mic-fill me-2"></i>Podcasts
              </h2>
              <ul className="list-group list-group-flush">
                {data.multimediaGuidance.podcasts.map((podcast) => (
                  <li key={podcast.id} className="list-group-item">
                    <a
                      href={podcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none d-block py-2"
                    >
                      {podcast.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 