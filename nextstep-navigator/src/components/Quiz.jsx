import React, { useState } from 'react';
import data from '../data/careerData.json';
import './Quiz.css'; // Don't forget to create this file

export default function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  return (
    <section className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">Career Quiz 🤔</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {data.quizQuestions.map((q) => (
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
        </div>
      </div>
    </section>
  );
}