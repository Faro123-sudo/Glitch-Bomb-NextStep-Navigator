import React, { useState, useEffect } from "react";
import defaultData from "../data/careerData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import Lottie from "lottie-react";
import lookingAnimation from "../assets/animation/looking.json";
import {
  FaGraduationCap,
  FaDollarSign,
  FaTools,
  FaFilter,
  FaSearch,
  FaSort,
  FaChevronDown,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import "./CareerBank.css";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function CareerBank({ userType = "" }) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(defaultData); // data used for rendering
  const [loadingData, setLoadingData] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      if (!userType) {
        setData(defaultData);
        return;
      }

      setLoadingData(true);
      const path = `/data/career_${userType}.json`;
      try {
        const res = await fetch(path);
        if (!res.ok) {
          setData(defaultData);
        } else {
          const json = await res.json();
          if (!cancelled) setData(json);
        }
      } catch (err) {
        console.warn("No user-specific career data found or fetch failed:", err);
        if (!cancelled) setData(defaultData);
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [userType]);

  const industries = [
    "All",
    ...new Set((data.careerBank || []).map((career) => career.industry || "Other")),
  ];

  const computePrioritizedList = () => {
    const list = (data.careerBank || []).map((career) => {
      const audiences = Array.isArray(career.audiences)
        ? career.audiences.map((a) => a.toLowerCase())
        : [];
      const hasAudience = userType && audiences.includes(userType.toLowerCase());
      return { ...career, __priority: hasAudience ? 0 : 1 };
    });

    let filtered = list;

    // Apply search + industry filter first
    filtered = filtered.filter((career) => {
      const matchesSearch =
        career.careerName.toLowerCase().includes(search.toLowerCase()) ||
        (career.skillsRequired || []).some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        );

      const matchesIndustry = selectedIndustry === "All" || career.industry === selectedIndustry;

      return matchesSearch && matchesIndustry;
    });

    if (userType && !showAll) {
      filtered.sort((a, b) => {
        if (a.__priority !== b.__priority) return a.__priority - b.__priority;
        return a.careerName.localeCompare(b.careerName);
      });
    }

    filtered = filtered.sort((a, b) => {
      if (sortOption === "salary-asc") {
        return (
          (parseInt(a.averageSalary.replace(/[^0-9]/g, "")) || 0) -
          (parseInt(b.averageSalary.replace(/[^0-9]/g, "")) || 0)
        );
      } else if (sortOption === "salary-desc") {
        return (
          (parseInt(b.averageSalary.replace(/[^0-9]/g, "")) || 0) -
          (parseInt(a.averageSalary.replace(/[^0-9]/g, "")) || 0)
        );
      } else if (sortOption === "alpha-asc") {
        return a.careerName.localeCompare(b.careerName);
      } else if (sortOption === "alpha-desc") {
        return b.careerName.localeCompare(a.careerName);
      }
      return 0;
    });

    return filtered;
  };

  let filteredCareers = computePrioritizedList();

  const handleShowModal = (career) => {
    setSelectedCareer(career);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCareer(null);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedIndustry("All");
    setSortOption("none");
    setShowAll(false);
  };

  const salaryChartData = {
    labels: filteredCareers.map((c) => c.careerName),
    datasets: [
      {
        label: "Average Salary",
        data: filteredCareers.map((c) =>
          parseInt((c.averageSalary || "0").replace(/[^0-9]/g, "")) || 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="career-bank-section py-5">
      <div className="container">
        <div className="text-center mb-3" data-aos="fade-right" data-aos-delay="300">
          <h1 className="display-5 fw-bold text-primary mb-1">Career Explorer</h1>
          <p className="text-muted">
            Discover career paths that match your skills and interests
            {userType ? (
              <>
                {" — "}
                <span className="badge bg-primary text-white">{userType.toUpperCase()} view</span>
                {!showAll && (
                  <small className="text-muted ms-2"> (prioritised recommendations shown)</small>
                )}
              </>
            ) : null}
          </p>
        </div>

        <div
          className="controls-container mb-4 p-3 rounded-4 shadow-sm"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <div className="row g-2 align-items-center">
            <div className="col-lg-4 col-md-12" data-aos="zoom-in" data-aos-delay="500">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by career or skill..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="500">
              <div className="input-group">
                <span className="input-group-text">
                  <FaFilter />
                </span>
                <select
                  className="form-select"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="500">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSort />
                </span>
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="none">Sort by</option>
                  <option value="salary-desc">Salary (High to Low)</option>
                  <option value="salary-asc">Salary (Low to High)</option>
                  <option value="alpha-asc">Alphabetical (A-Z)</option>
                  <option value="alpha-desc">Alphabetical (Z-A)</option>
                </select>
              </div>
            </div>

            <div className="col-lg-2 col-md-12 text-end d-flex flex-column align-items-end">
              <div className="mb-2 w-100">
                <button className="btn btn-outline-secondary w-100" onClick={clearFilters}>
                  Clear
                </button>
              </div>
              {userType && (
                <div className="w-100">
                  <button
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => setShowAll((s) => !s)}
                    aria-pressed={showAll}
                    title="Toggle showing all careers"
                  >
                    {showAll ? "Showing: All careers" : `Showing: Prioritised for ${userType}`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {loadingData ? (
          <div className="text-center py-5">
            <p className="text-muted">Loading career data...</p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="text-center py-5">
            <Lottie animationData={lookingAnimation} className="empty-state-animation" />
            <h3 className="mb-3">No careers found</h3>
            <p className="text-muted mb-4">Try adjusting your search or filter criteria</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4" data-aos="zoom-in" data-aos-delay="500">
              {filteredCareers.map((career) => (
                <div key={career.id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="career-card card h-100"
                    onClick={() => handleShowModal(career)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleShowModal(career);
                    }}
                  >
                    <div className="card-header d-flex justify-content-between align-items-start">
                      <h3 className="card-title h5">{career.careerName}</h3>
                      <div>
                        <span className="badge bg-primary-subtle text-primary me-1">
                          {career.industry}
                        </span>
                        {career.audiences && career.audiences.length > 0 && (
                          <span className="badge bg-info-subtle text-info ms-1">
                            {career.audiences.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-text text-muted mb-3">
                        {(career.description || "").substring(0, 120)}...
                      </p>
                      <div className="d-flex align-items-center mb-2">
                        <FaDollarSign className="text-success me-2" />
                        <span className="fw-bold text-success">{career.averageSalary}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaGraduationCap className="text-warning me-2" />
                        <span>{career.educationPath}</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={() => handleShowModal(career)}
                      >
                        See Full Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCareer && (
              <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedCareer.careerName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    <strong>Industry:</strong> {selectedCareer.industry}
                  </p>
                  <p>
                    <strong>Average Salary:</strong> {selectedCareer.averageSalary}
                  </p>
                  <p>
                    <strong>Education Path:</strong> {selectedCareer.educationPath}
                  </p>
                  <p>
                    <strong>Job Outlook:</strong> {selectedCareer.jobOutlook}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedCareer.description}
                  </p>
                  <p>
                    <strong>Day in the Life:</strong> {selectedCareer.dayInTheLife}
                  </p>

                  <div>
                    <strong>Skills Required:</strong>
                    <div className="skills-container mt-2">
                      {selectedCareer.skillsRequired?.map((skill, i) => (
                        <span key={i} className="badge me-1 mb-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <strong>Related Roles:</strong>
                    <ul className="list-unstyled mt-2">
                      {selectedCareer.relatedRoles?.map((role, i) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedCareer.careerVideo && (
                    <div className="mt-4">
                      <h5>Career Video</h5>
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={selectedCareer.careerVideo}
                          title={selectedCareer.careerName}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            )}

            <div className="mt-5">
              <h2 className="text-center mb-4">Salary Comparison</h2>
              <div className="salary-chart-container" style={{ minHeight: 240 }}>
                <Bar data={salaryChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
