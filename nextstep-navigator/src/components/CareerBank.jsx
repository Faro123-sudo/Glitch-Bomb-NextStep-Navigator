import React, { useState, useEffect } from "react";
import data from "../data/careerData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGraduationCap, FaDollarSign, FaTools, FaFilter, FaSearch, FaSort, FaChevronDown, FaInfoCircle, FaTimes } from "react-icons/fa";
import "./CareerBank.css";

export default function CareerBank() {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const [expandedCard, setExpandedCard] = useState(null);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const industries = [
    "All",
    ...new Set(data.careerBank.map((career) => career.industry)),
  ];

  let filteredCareers = data.careerBank.filter((career) => {
    const matchesSearch =
      career.careerName.toLowerCase().includes(search.toLowerCase()) ||
      career.skillsRequired.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesIndustry =
      selectedIndustry === "All" || career.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  filteredCareers = filteredCareers.sort((a, b) => {
    if (sortOption === "salary-asc") {
      return (
        parseInt(a.averageSalary.replace(/[^0-9]/g, "")) -
        parseInt(b.averageSalary.replace(/[^0-9]/g, ""))
      );
    } else if (sortOption === "salary-desc") {
      return (
        parseInt(b.averageSalary.replace(/[^0-9]/g, "")) -
        parseInt(a.averageSalary.replace(/[^0-9]/g, ""))
      );
    } else if (sortOption === "alpha-asc") {
      return a.careerName.localeCompare(b.careerName);
    } else if (sortOption === "alpha-desc") {
      return b.careerName.localeCompare(a.careerName);
    }
    return 0;
  });

  const toggleCardExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedIndustry("All");
    setSortOption("none");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showIndustryDropdown && !event.target.closest('.industry-dropdown')) {
        setShowIndustryDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showIndustryDropdown]);

  return (
    <section className="career-bank-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary mb-3">Career Explorer</h1>
          <p className="text-muted">Discover career paths that match your skills and interests</p>
        </div>

        <div className="controls-container mb-5 p-4 rounded-4 shadow-sm">
          <div className="row g-3">
            <div className="col-lg-5">
              <div className="search-box position-relative">
                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control ps-5 rounded-pill"
                  placeholder="Search careers or skills..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-3"
                    onClick={() => setSearch("")}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
            
            <div className="col-lg-3 industry-dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle w-100 rounded-pill d-flex align-items-center justify-content-between"
                  type="button"
                  onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                >
                  <span>
                    <FaFilter className="me-2" />
                    {selectedIndustry === "All" ? "All Industries" : selectedIndustry}
                  </span>
                </button>
                <div className={`dropdown-menu w-100 p-3 ${showIndustryDropdown ? "show" : ""}`}>
                  <h6 className="dropdown-header">Select Industry</h6>
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      className={`dropdown-item ${selectedIndustry === industry ? "active" : ""}`}
                      onClick={() => {
                        setSelectedIndustry(industry);
                        setShowIndustryDropdown(false);
                      }}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-3">
              <div className="sort-dropdown position-relative">
                <FaSort className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted z-1" />
                <select
                  className="form-select ps-5 rounded-pill"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="none">Sort Options</option>
                  <option value="salary-asc">Salary: Low to High</option>
                  <option value="salary-desc">Salary: High to Low</option>
                  <option value="alpha-asc">Alphabetical A-Z</option>
                  <option value="alpha-desc">Alphabetical Z-A</option>
                </select>
              </div>
            </div>
            
            <div className="col-lg-1">
              <button 
                className="btn btn-outline-secondary w-100 rounded-pill"
                onClick={clearFilters}
                title="Clear all filters"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          
          {/* Active filters display */}
          {(search || selectedIndustry !== "All" || sortOption !== "none") && (
            <div className="active-filters mt-3 d-flex flex-wrap align-items-center">
              <span className="me-2 text-muted">Active filters:</span>
              
              {search && (
                <span className="badge bg-primary me-2 mb-2">
                  Search: {search}
                  <button 
                    className="ms-2 btn-close btn-close-white"
                    onClick={() => setSearch("")}
                  ></button>
                </span>
              )}
              
              {selectedIndustry !== "All" && (
                <span className="badge bg-info me-2 mb-2">
                  Industry: {selectedIndustry}
                  <button 
                    className="ms-2 btn-close btn-close-white"
                    onClick={() => setSelectedIndustry("All")}
                  ></button>
                </span>
              )}
              
              {sortOption !== "none" && (
                <span className="badge bg-warning me-2 mb-2">
                  Sorted: {
                    sortOption === "salary-asc" ? "Salary: Low to High" :
                    sortOption === "salary-desc" ? "Salary: High to Low" :
                    sortOption === "alpha-asc" ? "A-Z" : "Z-A"
                  }
                  <button 
                    className="ms-2 btn-close"
                    onClick={() => setSortOption("none")}
                  ></button>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="results-info mb-4 d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted">
            Showing <strong>{filteredCareers.length}</strong> of <strong>{data.careerBank.length}</strong> careers
            {search && <> for "<strong>{search}</strong>"</>}
            {selectedIndustry !== "All" && <> in "<strong>{selectedIndustry}</strong>"</>}
          </p>
          
          {sortOption !== "none" && (
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSortOption("none")}
            >
              Clear Sort
            </button>
          )}
        </div>

        <div className="row g-4">
          {filteredCareers.length === 0 ? (
            <div className="col-12 text-center py-5">
              <div className="empty-state bg-light rounded-4 p-5">
                <FaSearch className="display-1 text-muted mb-3" />
                <h3 className="mb-3">No careers found</h3>
                <p className="text-muted mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={clearFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            filteredCareers.map((career, index) => (
              <div
                key={career.id}
                className="col-12 col-md-6 col-lg-4"
              >
                <div 
                  className={`career-card card h-100 border-0 shadow-sm overflow-hidden ${
                    expandedCard === career.id ? "expanded" : ""
                  }`}
                >
                  <div className="card-header bg-white border-0 pb-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <h3 className="card-title h5 text-primary mb-0">
                        {career.careerName}
                      </h3>
                      <span className="badge bg-primary-subtle text-primary">
                        {career.industry}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <p className="card-text text-muted mb-3">
                      {expandedCard === career.id 
                        ? career.description 
                        : `${career.description.substring(0, 120)}...`
                      }
                    </p>
                    
                    <div className="career-details">
                      <div className="detail-item d-flex align-items-center mb-2">
                        <FaDollarSign className="text-success me-2 flex-shrink-0" />
                        <div>
                          <small className="text-muted">Average Salary</small>
                          <div className="fw-bold text-success">{career.averageSalary}</div>
                        </div>
                      </div>
                      
                      <div className="detail-item d-flex align-items-center mb-2">
                        <FaGraduationCap className="text-warning me-2 flex-shrink-0" />
                        <div>
                          <small className="text-muted">Education Path</small>
                          <div className="fw-bold">{career.educationPath}</div>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <div className="d-flex align-items-start mb-2">
                          <FaTools className="text-info mt-1 me-2 flex-shrink-0" />
                          <div>
                            <small className="text-muted">Skills Required</small>
                            <div className="skills-container mt-1">
                              {career.skillsRequired.map((skill, i) => (
                                <span key={i} className="badge bg-light text-dark me-1 mb-1">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer bg-white border-0 pt-0">
                    <button 
                      className="btn btn-sm btn-outline-primary w-100"
                      onClick={() => toggleCardExpand(career.id)}
                    >
                      {expandedCard === career.id ? "Show Less" : "See Full Details"}
                      <FaChevronDown className={`ms-2 toggle-icon ${expandedCard === career.id ? "expanded" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}