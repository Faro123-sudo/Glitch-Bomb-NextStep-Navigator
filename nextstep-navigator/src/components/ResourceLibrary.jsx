import React, { useState, useMemo } from "react";
import data from "../data/careerData.json";
import './ResourceLibrary.css';
import { FaSearch, FaFileAlt, FaBookOpen, FaChalkboardTeacher, FaFileDownload } from 'react-icons/fa';

const resourceTypes = ["All", "Article", "E-book", "Webinar", "Template"];

const getIconForType = (type) => {
  switch (type) {
    case "Article":
      return <FaFileAlt className="resource-icon" />;
    case "E-book":
      return <FaBookOpen className="resource-icon" />;
    case "Webinar":
      return <FaChalkboardTeacher className="resource-icon" />;
    case "Template":
      return <FaFileDownload className="resource-icon" />;
    default:
      return null;
  }
};

export default function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const allResources = useMemo(() => {
    return [
      ...data.resourceLibrary.articles,
      ...data.resourceLibrary.ebooks,
      ...data.resourceLibrary.webinars,
      ...(data.resourceLibrary.templates || []),
    ];
  }, []);

  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      const matchesFilter = activeFilter === "All" || resource.type === activeFilter;
      const matchesSearch = searchTerm === "" || resource.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [allResources, activeFilter, searchTerm]);

  return (
    <section className="resource-library-section container py-5">
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="display-4 fw-bold text-primary">Resource Library 📚</h1>
        <p className="lead text-muted" data-aos-delay="100">Your one-stop hub for career-enhancing articles, e-books, and tools.</p>
      </div>

      <div className="controls-wrapper mb-5 p-4 rounded-4 shadow-sm" data-aos="fade-up" data-aos-delay="200">
        <div className="row g-3 align-items-center">
          <div className="col-lg-5 col-md-12">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="filter-buttons d-flex flex-wrap justify-content-center justify-content-lg-start gap-2">
              {resourceTypes.map(type => (
                <button
                  key={type}
                  className={`btn btn-sm rounded-pill ${activeFilter === type ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveFilter(type)}
                >
                  {type}s
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4" data-aos="fade-up" data-aos-delay="300">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, idx) => (
            <div key={resource.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 50}>
              <div className="resource-card card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-start mb-3">
                    {getIconForType(resource.type)}
                    <div className="flex-grow-1">
                      <h5 className="card-title fw-bold mb-1">{resource.title}</h5>
                      <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{resource.type}</span>
                    </div>
                  </div>
                  <p className="card-text text-muted small flex-grow-1">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm mt-auto stretched-link"
                  >
                    {resource.type === 'Webinar' ? 'Watch Now' : 'Access Resource'}
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5" data-aos="zoom-in">
            <h4 className="text-muted">No resources found.</h4>
            <p className="text-muted">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}