// Quiz.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import defaultData from "../data/careerData.json";
import "./Quiz.css"; // optional: add styles if you like

export default function Quiz({ userType = "" }) {
  // pick quiz set from master data: careerData.json
  const quizSets = defaultData.quizQuestions || {};
  const normalizedType = (userType || "student").toLowerCase();
  const questions = quizSets[normalizedType] || quizSets.student || [];

  // state for answers: { [questionId]: selectedOption }
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ ranked: [], followUpResources: [] });

  // Reset quiz if userType changes (so UI matches the view)
  useEffect(() => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
    setResults({ ranked: [], followUpResources: [] });
  }, [normalizedType]);

  const totalQuestions = questions.length;

  // helper: set answer for question
  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
  };
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  // Score aggregator
  const computeResults = () => {
    const scoreMap = {}; // careerName -> numeric score
    const resources = []; // list of followUpResources (dedup by title+type+url)

    for (const q of questions) {
      const qid = q.id;
      const selected = answers[qid];
      if (!selected) continue;

      const mapping = q.answersMapping && q.answersMapping[selected];
      if (!mapping) continue;

      const weight = typeof mapping.weight === "number" ? mapping.weight : 1;
      const careersList = Array.isArray(mapping.careers) ? mapping.careers : [];

      // increment score for each career in mapping
      for (const c of careersList) {
        // normalize career key (string)
        const key = String(c).trim();
        if (!key) continue;
        scoreMap[key] = (scoreMap[key] || 0) + weight;
      }

      // collect resources
      if (Array.isArray(mapping.followUpResources)) {
        for (const r of mapping.followUpResources) {
          // dedupe by type+title+url
          const signature = `${r.type || ""}::${r.title || ""}::${r.url || ""}`;
          if (!resources.some((x) => x._sig === signature)) {
            resources.push({ ...r, _sig: signature });
          }
        }
      }
    }

    // convert scoreMap to sorted array
    const ranked = Object.entries(scoreMap)
      .map(([careerName, score]) => ({ careerName, score }))
      .sort((a, b) => b.score - a.score);

    // Try to match the ranked careers against careerBank to show metadata (salary/education)
    const bank = defaultData.careerBank || [];
    const enrich = ranked.map((r) => {
      const match =
        bank.find(
          (b) =>
            b.careerName.toLowerCase() === r.careerName.toLowerCase() ||
            r.careerName.toLowerCase().includes(b.careerName.toLowerCase()) ||
            b.careerName.toLowerCase().includes(r.careerName.toLowerCase())
        ) || null;
      return {
        ...r,
        match: match
          ? {
              id: match.id,
              careerName: match.careerName,
              averageSalary: match.averageSalary,
              educationPath: match.educationPath,
              industry: match.industry,
            }
          : null,
      };
    });

    // prepare followUpResources (remove _sig before saving)
    const cleanedResources = resources.map(({ _sig, ...rest }) => rest);

    setResults({ ranked: enrich, followUpResources: cleanedResources });
    setShowResults(true);
  };

  // Quick guard for submit: require at least one answer
  const canSubmit = useMemo(() => Object.keys(answers).length > 0, [answers]);

  // UI for question item
  const QuestionCard = ({ q, index }) => {
    const selected = answers[q.id] || "";
    return (
      <div className="card quiz-question-card mb-3">
        <div className="card-body">
          <h5 className="card-title">
            {index + 1}. {q.question}
          </h5>
          {q.tags && q.tags.length > 0 && (
            <div className="mb-2">
              {q.tags.map((t) => (
                <span key={t} className="badge bg-light text-secondary me-1">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div role="radiogroup" aria-labelledby={`q-${q.id}-label`}>
            {q.options.map((opt) => {
              const optId = `q-${q.id}-${opt}`;
              return (
                <div className="form-check" key={opt}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`q-${q.id}`}
                    id={optId}
                    checked={selected === opt}
                    onChange={() => handleSelect(q.id, opt)}
                  />
                  <label className="form-check-label" htmlFor={optId}>
                    {opt}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Reset / retake
  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
    setResults({ ranked: [], followUpResources: [] });
  };

  // If there are no questions for the user type
  if (!questions || questions.length === 0) {
    return (
      <section className="quiz-section py-5">
        <div className="container text-center">
          <h2>No quiz available</h2>
          <p className="text-muted">There are no quiz questions for the selected view.</p>
        </div>
      </section>
    );
  }

  // Progress percent
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <section className="quiz-section py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Career Interest Quiz</h2>
          <p className="text-muted">Answer a few quick questions to get personalised career suggestions.</p>
        </div>

        <div className="row">
          <div className="col-12 col-md-8 mx-auto">
            <div className="mb-3">
              <ProgressBar now={progressPercent} label={`${progressPercent}%`} />
            </div>

            <QuestionCard q={questions[currentIndex]} index={currentIndex} />

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    // Quick helper: mark question as "skip" by setting empty if not answered yet
                    if (!answers[questions[currentIndex].id]) {
                      handleSelect(questions[currentIndex].id, "");
                    }
                    goNext();
                  }}
                  disabled={currentIndex === totalQuestions - 1}
                >
                  Next
                </button>
              </div>

              <div>
                <button
                  className="btn btn-light me-2"
                  onClick={() => {
                    // Jump to first unanswered question if any
                    const firstUnanswered = questions.findIndex((q) => !answers[q.id]);
                    if (firstUnanswered >= 0) setCurrentIndex(firstUnanswered);
                    else setCurrentIndex(0);
                  }}
                >
                  Jump to unanswered
                </button>

                <button
                  className="btn btn-primary"
                  onClick={computeResults}
                  disabled={!canSubmit}
                >
                  Submit & See Results
                </button>
              </div>
            </div>

            <div className="mt-3 text-muted small">
              Answered {Object.keys(answers).filter((k) => answers[k]).length} of {totalQuestions}
            </div>

            {/* Optionally show a small summary of selected answers */}
            {Object.keys(answers).length > 0 && (
              <div className="mt-4">
                <h6>Your current selections (quick view)</h6>
                <ul className="list-group">
                  {questions.map((q) => (
                    <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div style={{ maxWidth: "70%" }}>
                        <small className="text-muted">{q.question}</small>
                        <div>{answers[q.id] || <em className="text-muted">No answer</em>}</div>
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => setCurrentIndex(questions.findIndex((x) => x.id === q.id))}
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          
        </div>

        {/* RESULTS MODAL */}
        <Modal show={showResults} onHide={() => setShowResults(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Recommended Career Paths</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {results.ranked.length === 0 ? (
              <p className="text-muted">No strong matches found — try answering more questions.</p>
            ) : (
              <>
                <p className="mb-3">
                  Based on your answers, here are the top career suggestions (ranked).
                </p>

                <div className="list-group mb-3">
                  {results.ranked.slice(0, 8).map((r, i) => (
                    <div key={r.careerName} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <strong className="me-2">{i + 1}. {r.careerName}</strong>
                          {r.match && (
                            <small className="text-muted"> — {r.match.industry} • {r.match.averageSalary}</small>
                          )}
                          <div className="mt-1">
                            <small className="text-muted">
                              Score: {r.score}
                              {r.match && r.match.educationPath ? ` • Education: ${r.match.educationPath}` : ""}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          {r.match ? (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                // Quick UX: navigate to CareerBank details by scrolling and highlighting
                                // If you later implement route-based navigation, link to that route.
                                const msg = `Open CareerBank and search for: ${r.match.careerName}`;
                                window.alert(msg);
                              }}
                              className="btn btn-sm btn-outline-primary"
                            >
                              View in Career Bank
                            </a>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>
                                window.alert(
                                  `No direct CareerBank match for "${r.careerName}". Try searching in Career Bank.`
                                )
                              }
                            >
                              Search Career Bank
                            </button>
                          )}
                        </div>
                      </div>
                      {/* optional short description from match */}
                      {r.match && r.match.careerName && (
                        <div className="mt-2">
                          <small className="text-muted">
                            {r.match.careerName} — {r.match.industry} • {r.match.educationPath}
                          </small>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {results.followUpResources.length > 0 && (
                  <>
                    <h6>Suggested next steps & resources</h6>
                    <div className="row">
                      {results.followUpResources.map((res, idx) => (
                        <div key={idx} className="col-12 col-md-6 mb-2">
                          <div className="card p-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <div className="small text-muted text-uppercase">{res.type}</div>
                                <div className="fw-semibold">{res.title}</div>
                                {res.description && <div className="small text-muted">{res.description}</div>}
                              </div>
                              {res.url && (
                                <div>
                                  <a className="btn btn-sm btn-primary" href={res.url} target="_blank" rel="noreferrer">
                                    Open
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowResults(false)}>
              Close
            </Button>
            <Button variant="outline-primary" onClick={handleRetake}>
              Retake Quiz
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
}
