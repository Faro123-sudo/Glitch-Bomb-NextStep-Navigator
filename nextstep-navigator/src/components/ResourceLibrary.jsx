import React from "react";
import data from "../data/careerData.json";
import './ResourceLibrary.css'; // Don't forget to create this file

export default function ResourceLibrary() {
  return (
    <section className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold">Resource Library 📚</h1>
      <div className="row g-4 justify-content-center">

        {/* Articles Section */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 shadow-lg border-0 library-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-journal-text me-2"></i>Articles
              </h2>
              <ul className="list-group list-group-flush">
                {data.resourceLibrary.articles.map((article) => (
                  <li key={article.id} className="list-group-item">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* E-books Section */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 shadow-lg border-0 library-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-book me-2"></i>E-books
              </h2>
              <ul className="list-group list-group-flush">
                {data.resourceLibrary.ebooks.map((ebook) => (
                  <li key={ebook.id} className="list-group-item">
                    <a href={ebook.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      {ebook.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Webinars Section */}
        <div className="col-lg-4 col-md-12">
          <div className="card h-100 shadow-lg border-0 library-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">
                <i className="bi bi-camera-video me-2"></i>Webinars
              </h2>
              <ul className="list-group list-group-flush">
                {data.resourceLibrary.webinars.map((webinar) => (
                  <li key={webinar.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{webinar.title}</span>
                    <a href={webinar.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-pill">
                      Join <span className="d-none d-md-inline">Webinar</span>
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