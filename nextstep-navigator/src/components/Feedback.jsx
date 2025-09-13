import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import "./Feedback.css"; 

export default function Feedback() {
  const [showFeedback, setShowFeedback] = useState(false);

  if (location.pathname === "/landing"
  ) {
    return null;
  }

  return (
    <>
      <button
        className="btn btn-primary rounded-circle shadow-lg feedback-btn"
        onClick={() => setShowFeedback(true)}
      >
        <FaCommentDots size={24} />
      </button>

      {showFeedback && (
        <div className="feedback-modal d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-4 rounded-4 feedback-card">
            <h5 className="fw-bold text-center mb-3">We’d love your feedback 💬</h5>
            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Share your thoughts..."
            ></textarea>
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={() => setShowFeedback(false)}>
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  alert("Thank you for your feedback!");
                  setShowFeedback(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
