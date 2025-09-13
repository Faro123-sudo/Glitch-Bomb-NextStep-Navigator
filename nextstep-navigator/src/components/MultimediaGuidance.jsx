import React, { useState, useEffect } from "react";
import data from "../data/careerData.json";
import "./MultimediaGuidance.css";

const allVideos = data.multimediaGuidance.videos;
const allPodcasts = data.multimediaGuidance.podcasts;
const categories = [
  "All",
  ...Array.from(new Set([...allVideos, ...allPodcasts].map(item => item.category).filter(Boolean)))
];
const userTypes = [
  "All",
  ...Array.from(new Set([...allVideos, ...allPodcasts].map(item => item.userType).filter(Boolean)))
];

export default function MultimediaGuidance({ userType = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUserType, setSelectedUserType] = useState(userType || "All");
  const [showTranscriptId, setShowTranscriptId] = useState(null);

  useEffect(() => {
    if (userType) setSelectedUserType(userType);
  }, [userType]);

  const filterFn = (item) =>
    (selectedCategory === "All" || item.category === selectedCategory) &&
    (selectedUserType === "All" || item.userType.toLowerCase() === selectedUserType.toLowerCase());

  const filteredVideos = allVideos.filter(filterFn);
  const filteredPodcasts = allPodcasts.filter(filterFn);

  const isYouTube = (url) => url.includes("youtube.com/embed/");
  const featuredVideo = filteredVideos[0] || allVideos[0];
  const featuredPodcast = filteredPodcasts[0] || allPodcasts[0];

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4 display-4 fw-bold text-primary" data-aos="fade-down">
        Multimedia Guidance
      </h1>
      <p className="text-center text-muted mb-5 fs-5" data-aos="fade-up" data-aos-delay="100">
        {userType
          ? `Curated for ${userType.charAt(0).toUpperCase() + userType.slice(1)}s`
          : "Watch and listen to professionals share real-world insights. Filter by category or user type to find what inspires you!"}
      </p>

      <div className="row mb-5" data-aos="fade-up" data-aos-delay="200">
        <div className="col-md-6 mb-3" data-aos="zoom-in-right" data-aos-delay="300">
          <div className="card multimedia-card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold mb-3">
                <i className="bi bi-star-fill me-2"></i>Featured Video
              </h5>
              {featuredVideo && (
                <>
                  <iframe
                    width="100%"
                    height="220"
                    src={featuredVideo.url}
                    title={featuredVideo.title}
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded mb-2"
                  ></iframe>
                  <div className="fw-semibold">{featuredVideo.title}</div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3" data-aos="zoom-in-left" data-aos-delay="400">
          <div className="card multimedia-card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold mb-3">
                <i className="bi bi-star-fill me-2"></i>Featured Podcast
              </h5>
              {featuredPodcast && (
                <>
                  <a
                    href={featuredPodcast.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fw-semibold text-decoration-none"
                  >
                    {featuredPodcast.title}
                  </a>
                  <div className="mt-2 small text-muted">
                    {featuredPodcast.transcript?.slice(0, 120)}...
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4" data-aos="fade-up" data-aos-delay="200">
        <div>
          <span className="fw-semibold me-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 me-1 mb-1 ${
                selectedCategory === cat ? "btn-primary text-white" : "btn-outline-primary"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        {!userType && (
          <div>
            <span className="fw-semibold me-2">User Type:</span>
            {userTypes.map((type) => (
              <button
                key={type}
                className={`btn btn-sm rounded-pill px-3 me-1 mb-1 ${
                  selectedUserType === type ? "btn-primary text-white" : "btn-outline-primary"
                }`}
                onClick={() => setSelectedUserType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="row g-4 justify-content-center" data-aos="fade-up" data-aos-delay="300">
        <div className="col-md-6" data-aos="fade-right" data-aos-delay="400">
          <div className="card shadow-lg border-0 h-100 multimedia-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-play-circle-fill me-2"></i>Videos
              </h2>
              {filteredVideos.length === 0 && (
                <div className="text-center text-muted py-3">No videos found.</div>
              )}
              <ul className="list-group list-group-flush">
                {filteredVideos.map((video) => (
                  <li key={video.id} className="list-group-item">
                    <div className="d-flex align-items-center">
                      {isYouTube(video.url) && (
                        <iframe
                          width="100%"
                          height="180"
                          src={video.url}
                          title={video.title}
                          frameBorder="0"
                          allowFullScreen
                          className="rounded mb-2"
                          style={{ maxWidth: "320px", marginRight: "1rem" }}
                        ></iframe>
                      )}
                      <div>
                        <div className="fw-semibold">{video.title}</div>
                        <button
                          className="btn btn-link btn-sm p-0"
                          onClick={() =>
                            setShowTranscriptId(
                              showTranscriptId === video.id ? null : video.id
                            )
                          }
                        >
                          {showTranscriptId === video.id
                            ? "Hide Transcript"
                            : "Show Transcript"}
                        </button>
                        {showTranscriptId === video.id && video.transcript && (
                          <div className="mt-2 small text-muted">{video.transcript}</div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6" data-aos="fade-left" data-aos-delay="500">
          <div className="card shadow-lg border-0 h-100 multimedia-card argon-podcast-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-mic-fill me-2 argon-accent"></i>Podcasts
              </h2>
              {filteredPodcasts.length === 0 && (
                <div className="text-center text-muted py-3">No podcasts found.</div>
              )}
              <ul className="list-group list-group-flush argon-podcast-list-scroll">
                {filteredPodcasts.map((podcast) => (
                  <li key={podcast.id} className="list-group-item d-flex align-items-center">
                    <div className="argon-podcast-cover me-3">
                      <i className="bi bi-mic-fill"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{podcast.title}</div>
                      <div className="small text-muted">
                        {podcast.category} • {podcast.userType}
                      </div>
                      <button
                        className="btn btn-link btn-sm p-0 mt-1 text-primary"
                        onClick={() =>
                          setShowTranscriptId(
                            showTranscriptId === podcast.id ? null : podcast.id
                          )
                        }
                      >
                        {showTranscriptId === podcast.id
                          ? "Hide Transcript"
                          : "Show Transcript"}
                      </button>
                      {showTranscriptId === podcast.id && podcast.transcript && (
                        <div className="mt-2 small">{podcast.transcript}</div>
                      )}
                    </div>
                    <a
                      href={podcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-argon-play rounded-circle ms-3"
                    >
                      <i className="bi bi-play-fill"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5" data-aos="fade-up" data-aos-delay="200">
        <div className="col-12" data-aos="zoom-in-up" data-aos-delay="300">
          <div className="card multimedia-card shadow border-0">
            <div className="card-body">
              <h4 className="card-title text-primary fw-bold mb-3">
                <i className="bi bi-people-fill me-2"></i>Interactive Workshops
              </h4>
              <ul className="list-group list-group-flush">
                {data.multimediaGuidance.interactiveWorkshops.map((ws) => (
                  <li key={ws.id} className="list-group-item">
                    <span className="fw-semibold">{ws.title}</span>
                    <span className="ms-2 text-muted small">{ws.date}</span>
                    <a
                      href={ws.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-pill ms-3"
                    >
                      Join
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
