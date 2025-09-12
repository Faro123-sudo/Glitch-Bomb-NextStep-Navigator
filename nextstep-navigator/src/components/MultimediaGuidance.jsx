import React, { useState } from "react";
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

const featuredVideo = allVideos[0];
const featuredPodcast = allPodcasts[0];

export default function MultimediaGuidance({ userType }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUserType, setSelectedUserType] = useState(userType || "All");
  const [showTranscriptId, setShowTranscriptId] = useState(null);

  const filterFn = item =>
    (selectedCategory === "All" || item.category === selectedCategory) &&
    (selectedUserType === "All" || item.userType === selectedUserType);

  const filteredVideos = allVideos.filter(filterFn);
  const filteredPodcasts = allPodcasts.filter(filterFn);

  const isYouTube = url => url.includes("youtube.com/embed/");

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4 display-5 fw-bold text-primary">
        Multimedia Guidance
      </h1>
      <p className="text-center text-muted mb-4 fs-5">
        Watch and listen to professionals share real-world insights. Filter by category or user type to find what inspires you!
      </p>

      {/* Filters - stack on small screens */}
      <div className="d-flex flex-column flex-md-row flex-wrap justify-content-center gap-3 mb-4">
        <div className="text-center">
          <span className="fw-semibold me-2">Category:</span>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 me-1 mb-1 ${
                selectedCategory === cat ? "btn-primary text-white" : "btn-outline-primary"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-center">
          <span className="fw-semibold me-2">User Type:</span>
          {userTypes.map(type => (
            <button
              key={type}
              className={`btn btn-sm rounded-pill px-3 me-1 mb-1 ${
                selectedUserType === type ? "btn-primary text-white" : "btn-outline-primary"
              }`}
              onClick={() => setSelectedUserType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section - stack vertically on small screens */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-lg-6">
          <div className="card multimedia-card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold mb-3">
                <i className="bi bi-star-fill me-2"></i>Featured Video
              </h5>
              {featuredVideo && (
                <>
                  <div className="ratio ratio-16x9 mb-2">
                    <iframe
                      src={featuredVideo.url}
                      title={featuredVideo.title}
                      allowFullScreen
                      className="rounded"
                    ></iframe>
                  </div>
                  <div className="fw-semibold">{featuredVideo.title}</div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card multimedia-card shadow border-0 h-100">
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
                    className="fw-semibold text-decoration-none d-block mb-2"
                  >
                    {featuredPodcast.title}
                  </a>
                  <div className="small text-muted">{featuredPodcast.transcript?.slice(0, 120)}...</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Videos & Podcasts stacked on mobile, side-by-side on desktop */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-lg border-0 h-100 multimedia-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-play-circle-fill me-2"></i>Videos
              </h2>
              {filteredVideos.length === 0 ? (
                <div className="text-center text-muted py-3">No videos found.</div>
              ) : (
                <ul className="list-group list-group-flush">
                  {filteredVideos.map((video) => (
                    <li key={video.id} className="list-group-item">
                      <div className="d-flex flex-column flex-md-row align-items-start">
                        {isYouTube(video.url) && (
                          <div className="ratio ratio-16x9 flex-shrink-0 mb-2 mb-md-0 me-md-3" style={{ minWidth: "250px" }}>
                            <iframe src={video.url} title={video.title} allowFullScreen></iframe>
                          </div>
                        )}
                        <div className="flex-grow-1">
                          <div className="fw-semibold">{video.title}</div>
                          <button
                            className="btn btn-link btn-sm p-0"
                            onClick={() => setShowTranscriptId(showTranscriptId === video.id ? null : video.id)}
                          >
                            {showTranscriptId === video.id ? "Hide Transcript" : "Show Transcript"}
                          </button>
                          {showTranscriptId === video.id && video.transcript && (
                            <div className="mt-2 small text-muted">{video.transcript}</div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-lg border-0 h-100 multimedia-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-mic-fill me-2"></i>Podcasts
              </h2>
              {filteredPodcasts.length === 0 ? (
                <div className="text-center text-muted py-3">No podcasts found.</div>
              ) : (
                <ul className="list-group list-group-flush">
                  {filteredPodcasts.map((podcast) => (
                    <li key={podcast.id} className="list-group-item d-flex flex-column flex-md-row align-items-start">
                      <div className="me-md-3 mb-2 mb-md-0">
                        <i className="bi bi-mic-fill fs-3 text-primary"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold">{podcast.title}</div>
                        <div className="small text-muted">{podcast.category} • {podcast.userType}</div>
                        <button
                          className="btn btn-link btn-sm p-0 mt-1 text-primary"
                          onClick={() => setShowTranscriptId(showTranscriptId === podcast.id ? null : podcast.id)}
                        >
                          {showTranscriptId === podcast.id ? "Hide Transcript" : "Show Transcript"}
                        </button>
                        {showTranscriptId === podcast.id && podcast.transcript && (
                          <div className="mt-2 small">{podcast.transcript}</div>
                        )}
                      </div>
                      <a
                        href={podcast.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary rounded-pill btn-sm mt-2 mt-md-0 ms-md-auto"
                      >
                        Play
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Workshops */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card multimedia-card shadow border-0">
            <div className="card-body">
              <h4 className="card-title text-primary fw-bold mb-3">
                <i className="bi bi-people-fill me-2"></i>Interactive Workshops
              </h4>
              <ul className="list-group list-group-flush">
                {data.multimediaGuidance.interactiveWorkshops.map(ws => (
                  <li key={ws.id} className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                    <div>
                      <span className="fw-semibold">{ws.title}</span>
                      <span className="ms-2 text-muted small">{ws.date}</span>
                    </div>
                    <a
                      href={ws.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-pill mt-2 mt-sm-0"
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

      <div className="text-center mt-5">
        <button className="btn btn-primary rounded-pill px-4 py-2">
          <i className="bi bi-plus-circle me-2"></i>Suggest a Resource
        </button>
        <p className="text-muted mt-2 small">
          Know a great video or podcast? Let us know and help others!
        </p>
      </div>
    </section>
  );
}
