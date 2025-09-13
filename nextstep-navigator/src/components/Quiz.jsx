import React, { useState, useMemo, useEffect } from "react";
import defaultData from "../data/careerData.json";
import "./Quiz.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleFill,
  Book,
  CameraVideo,
  Star,
} from "react-bootstrap-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const interests = [
  ...new Set(defaultData.careerBank.map((career) => career.industry)),
];

function extractKeywords(message) {
  if (typeof message !== "string") return [];
  return message
    .replace(
      /careers? in |roles? in |may suit you|could be (a )?good fit|might be a good mix|such as |like |Consider |Explore |Look into |office-based roles |Many careers offer both, /gi,
      ""
    )
    .split(/,| or | and /i)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export default function Quiz({ userType = "student" }) {
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showRecommendations, setShowRecommendations] = useState(false);

  const quizSets = defaultData.quizQuestions || {};
  const normalizedType = (userType || "student").toLowerCase();
  const allQuestionsForUser = useMemo(
    () => quizSets[normalizedType] || quizSets.student || [],
    [normalizedType, quizSets]
  );

  const filteredQuestions = useMemo(
    () =>
      selectedInterest
        ? allQuestionsForUser.filter(
            (q) =>
              !q.industries ||
              q.industries.length === 0 ||
              q.industries.includes(selectedInterest)
          )
        : [],
    [selectedInterest, allQuestionsForUser]
  );

  useEffect(() => {
    setSelectedAnswers({});
    setShowRecommendations(false);
  }, [selectedInterest, normalizedType]);

  const handleInterestChange = (e) => {
    setSelectedInterest(e.target.value);
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowRecommendations(true);
  };

  const recommendedCareers = useMemo(
    () =>
      defaultData.careerBank.filter(
        (career) => career.industry === selectedInterest
      ),
    [selectedInterest]
  );

  const bestMatches = useMemo(() => {
    if (!showRecommendations) return [];

    const keywords = new Set();
    filteredQuestions.forEach((q) => {
      const answer = selectedAnswers[q.id];
      if (answer && q.answersMapping[answer]) {
        const extracted = extractKeywords(q.answersMapping[answer].message);
        extracted.forEach((k) => keywords.add(k));
      }
    });

    const keywordArray = Array.from(keywords);
    if (keywordArray.length === 0) return [];

    return recommendedCareers.filter(
      (career) =>
        keywordArray.some(
          (keyword) =>
            career.careerName.toLowerCase().includes(keyword) ||
            career.industry.toLowerCase().includes(keyword) ||
            (career.skillsRequired || []).some((skill) =>
              skill.toLowerCase().includes(keyword)
            )
        )
    );
  }, [showRecommendations, filteredQuestions, selectedAnswers, recommendedCareers]);

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const totalQuestions = filteredQuestions.length;
  const progress =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  return (
    <section className="container py-5 quiz-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-aos="fade-down"
      >
        <h1 className="text-center mb-4 display-4 fw-bold text-primary">
          Your Career Discovery Quiz 🧭
        </h1>
        <p className="text-center text-muted mb-5 fs-5" data-aos="fade-up" data-aos-delay="100">
          Answer a few questions based on your interests to unlock personalized
          career suggestions and start your journey.
        </p>
      </motion.div>

      <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="200">
        <div className="col-lg-7 col-md-8">
          {!selectedInterest && (
            <div className="mb-4 text-center p-5 bg-light rounded-3" data-aos="zoom-in">
              <label
                htmlFor="interest-select"
                className="form-label fw-bold fs-4 mb-3"
              >
                First, select an area of interest:
              </label>
              <select
                id="interest-select"
                className="form-select form-select-lg"
                value={selectedInterest}
                onChange={handleInterestChange}
              >
                <option value="">-- Choose an interest --</option>
                {interests.map((interest, idx) => (
                  <option key={idx} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>
          )}

          <AnimatePresence>
            {selectedInterest && !showRecommendations && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-aos="fade-up"
              >
                {filteredQuestions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card shadow-sm mb-4 quiz-card"
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-start">
                        <div className="question-number me-3">{index + 1}</div>
                        <h5 className="card-title fw-bold mb-3 flex-grow-1">
                          {q.question}
                        </h5>
                      </div>
                      <div className="d-grid gap-2 ps-md-5">
                        {q.options.map((option, i) => {
                          const isActive = selectedAnswers[q.id] === option;
                          return (
                            <label
                              key={i}
                              className={`btn w-100 text-start p-3 rounded-pill quiz-option-btn ${
                                isActive ? "active" : ""
                              }`}
                              htmlFor={`q${q.id}-option${i}`}
                            >
                              <input
                                type="radio"
                                className="btn-check"
                                name={`question-${q.id}`}
                                id={`q${q.id}-option${i}`}
                                value={option}
                                checked={isActive}
                                onChange={() => handleOptionChange(q.id, option)}
                              />
                              <div className="d-flex justify-content-between align-items-center">
                                <span>{option}</span>
                                {isActive && (
                                  <CheckCircleFill size={20} className="ms-2" />
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mt-3"
                  disabled={
                    answeredQuestions !== totalQuestions || totalQuestions === 0
                  }
                >
                  See My Recommendations
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRecommendations && (
              <motion.div
                className="mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-aos="fade-in"
              >
                <h3 className="fw-bold text-success mb-4 text-center" data-aos="zoom-in">
                  Your Recommended Careers
                </h3>
                {recommendedCareers.length > 0 ? (
                  <div className="row g-4">
                    {bestMatches.length > 0 && (
                      <>
                        <h5 className="text-primary fw-bold col-12" data-aos="fade-right">
                          ⭐ Best Matches for You
                        </h5>
                        {bestMatches.map((career, idx) => (
                          <div className="col-md-6" key={career.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                            <div className="recommendation-card best-match h-100">
                              <h6 className="fw-bold">{career.careerName}</h6>
                              <p className="text-muted small">
                                {career.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    <h5 className="text-dark fw-bold col-12 mt-4" data-aos="fade-right">
                      Other Careers in {selectedInterest}
                    </h5>
                    {recommendedCareers
                      .filter((c) => !bestMatches.some((bm) => bm.id === c.id))
                      .map((career, idx) => (
                        <div className="col-md-6" key={career.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                          <div className="recommendation-card h-100">
                            <h6 className="fw-bold">{career.careerName}</h6>
                            <p className="text-muted small">
                              {career.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center">
                    No careers found for the selected interest.
                  </p>
                )}

                <div className="text-center p-4 mt-5 bg-light rounded-3 whats-next-card" data-aos="zoom-in" data-aos-delay="300">
                  <h4 className="fw-bold mb-3">What's Next?</h4>
                  <p className="text-muted">
                    Your journey doesn't stop here. Use these results to
                    explore more.
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                    <button className="btn btn-outline-primary">
                      <Book className="me-2" />
                      Explore the Career Bank
                    </button>
                    <button className="btn btn-outline-primary">
                      <CameraVideo className="me-2" />
                      Watch Expert Videos
                    </button>
                    <button className="btn btn-outline-primary">
                      <Star className="me-2" />
                      Read Success Stories
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="col-lg-4 col-md-4 d-none d-md-block">
          <div className="quiz-sidebar" data-aos="fade-left" data-aos-delay="400">
            {selectedInterest && !showRecommendations && (
              <div className="text-center mb-4">
                <div style={{ width: 150, height: 150, margin: "auto" }}>
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: "round",
                      textSize: "16px",
                      pathTransitionDuration: 0.5,
                      pathColor: `#0d6efd`,
                      textColor: "#0d6efd",
                      trailColor: "#e9ecef",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                </div>
                <p className="fw-bold mt-3">Quiz Progress</p>
              </div>
            )}
            <div className="info-card">
              <h5 className="fw-bold">Why this quiz?</h5>
              <ul>
                <li>
                  <strong>Personalized:</strong> Get suggestions based on what
                  you actually like.
                </li>
                <li>
                  <strong>Discover:</strong> Uncover careers you might not have
                  considered.
                </li>
                <li>
                  <strong>Guided:</strong> A simple first step in your career
                  exploration journey.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
