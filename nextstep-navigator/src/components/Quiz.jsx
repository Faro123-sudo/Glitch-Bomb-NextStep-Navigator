import React, { useState } from 'react';
import data from '../data/careerData.json';
import './Quiz.css';


const interests = [
  ...new Set(data.careerBank.map((career) => career.industry)),
];


function extractKeywords(mapping) {

  return mapping
    .replace(/careers? in |roles? in |may suit you|could be (a )?good fit|might be a good mix|such as |like |Consider |Explore |Look into |office-based roles |Many careers offer both, /gi, '')
    .split(/,| or | and /i)
    .map(s => s.trim())
    .filter(Boolean);
}

export default function Quiz() {
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showRecommendations, setShowRecommendations] = useState(false);


  const quizQuestions = data.quizQuestions;

  const filteredQuestions = selectedInterest
    ? quizQuestions.filter(q =>
        !q.industries || q.industries.includes(selectedInterest)
      )
    : [];

 
  const handleInterestChange = (e) => {
    setSelectedInterest(e.target.value);
    setSelectedAnswers({});
    setShowRecommendations(false);
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

  const recommendedCareers = data.careerBank.filter(
    (career) => career.industry === selectedInterest
  );


  let bestMatches = [];
  if (showRecommendations) {

    let keywords = [];
    data.quizQuestions.forEach(q => {
      const answer = selectedAnswers[q.id];
      if (answer && q.answersMapping[answer]) {
        keywords = keywords.concat(extractKeywords(q.answersMapping[answer]));
      }
    });

    bestMatches = recommendedCareers.filter(career =>
      keywords.some(keyword =>
        career.careerName.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4 display-4 fw-bold text-primary">Interest-Based Career Quiz 🎯</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Interest Dropdown */}
          <div className="mb-4">
            <label htmlFor="interest-select" className="form-label fw-bold">
              Select your area of interest:
            </label>
            <select
              id="interest-select"
              className="form-select"
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

          {/* Quiz Questions */}
          {selectedInterest && (
            <form onSubmit={handleSubmit}>
              {filteredQuestions.map((q) => (
                <div key={q.id} className="card shadow-lg mb-4 quiz-card border-0">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">{q.question}</h5>
                    <div className="d-grid gap-2">
                      {q.options.map((option, i) => (
                        <label
                          key={i}
                          className={`btn btn-outline-secondary text-start py-3 rounded-pill quiz-option-btn ${
                            selectedAnswers[q.id] === option ? 'active' : ''
                          }`}
                          htmlFor={`q${q.id}-option${i}`}
                        >
                          <input
                            type="radio"
                            className="btn-check"
                            name={`question-${q.id}`}
                            id={`q${q.id}-option${i}`}
                            autoComplete="off"
                            value={option}
                            checked={selectedAnswers[q.id] === option}
                            onChange={() => handleOptionChange(q.id, option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 mt-3"
                disabled={Object.keys(selectedAnswers).length !== filteredQuestions.length}
              >
                Get Recommendations
              </button>
            </form>
          )}

          {/* Recommendations */}
          {showRecommendations && (
            <div className="mt-5">
              <h3 className="fw-bold text-success mb-3">Recommended Streams & Careers:</h3>
              {recommendedCareers.length > 0 ? (
                <>
                  {bestMatches.length > 0 && (
                    <>
                      <h5 className="text-primary">Best Matches for Your Answers:</h5>
                      <ul className="list-group mb-3">
                        {bestMatches.map((career) => (
                          <li key={career.id} className="list-group-item list-group-item-success">
                            <strong>{career.careerName}</strong> <br />
                            <span className="text-muted">{career.description}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <h5>All Careers in {selectedInterest}:</h5>
                  <ul className="list-group">
                    {recommendedCareers.map((career) => (
                      <li
                        key={career.id}
                        className={`list-group-item${bestMatches.some(bm => bm.id === career.id) ? ' list-group-item-success' : ''}`}
                      >
                        <strong>{career.careerName}</strong> <br />
                        <span className="text-muted">{career.description}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No careers found for the selected interest.</p>
              )}
              
              <div className="mt-4">
                <h5 className="fw-bold">Quiz Insights:</h5>
                <ul>
                  {quizQuestions.map((q) => (
                    <li key={q.id}>
                      <strong>{q.question}</strong>
                      <br />
                      <span>
                        {q.answersMapping[selectedAnswers[q.id]]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}