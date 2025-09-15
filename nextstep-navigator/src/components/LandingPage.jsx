import React, { useState } from "react";
import Lottie from "lottie-react";
import Logo from "../assets/logo.webp";
import animationData from "../assets/animation/looking.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticFiles/LandingPage.css";

const LandingPage = ({ onNavigate }) => {
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      sessionStorage.setItem("username", name);
      sessionStorage.setItem("userType", userType);
      onNavigate();
      window.scrollTo(0, 0);
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center landing-bg" style={{ paddingTop: '0px !important;' }}>
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12" data-aos="fade-up" data-aos-delay="300">
              <img 
                src={Logo} 
                alt="NextStep Navigator Logo" 
                className="mb-4 fade-in" 
                style={{ height: '70px' }}
              />
              <h1 className="display-3 fw-bold text-primary mb-3">
                NextStep Navigator
              </h1>
              <h2 className="fw-semibold text-secondary mb-4">
                Your Guide to the Future
              </h2>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-lg-5 text-center mb-5 mb-md-0" data-aos="fade-right" data-aos-delay="500">
              <Lottie
                animationData={animationData}
                loop={true}
                style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
              />
              <p className="lead mt-4 text-muted px-3">
                Discover your perfect career path with personalized guidance and insights tailored just for you.
              </p>
            </div>
            <div className="col-md-6 col-lg-5" data-aos="fade-left" data-aos-delay="500">
              <div className="form-container p-4 p-md-5 shadow-lg rounded-3">
                <form onSubmit={handleSubmit}>
                  <h4 className="fw-bold mb-4 text-center">Get Started on Your Journey!</h4>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-lg rounded-pill"
                      placeholder="e.g., John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium">
                      I am a:
                    </label>
                    <div className="d-grid gap-2">
                      <input type="radio" className="btn-check" name="userType" id="student" value="student" checked={userType === 'student'} onChange={(e) => setUserType(e.target.value)} />
                      <label className="btn btn-outline-primary rounded-pill py-2" htmlFor="student">Student (Grade 8-12)</label>

                      <input type="radio" className="btn-check" name="userType" id="graduate" value="graduate" checked={userType === 'graduate'} onChange={(e) => setUserType(e.target.value)}  />
                      <label className="btn btn-outline-primary rounded-pill py-2" htmlFor="graduate">Graduate (UG/PG)</label>

                      <input type="radio" className="btn-check" name="userType" id="professional" value="professional" checked={userType === 'professional'} onChange={(e) => setUserType(e.target.value)} />
                      <label className="btn btn-outline-primary rounded-pill py-2" htmlFor="professional">Working Professional</label>
                    </div>
                  </div>
                  <div className="mb-4 text-center">
                    <small className="text-muted">
                      We respect your privacy. Your information is secure with us.
                    </small>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 py-2 fw-bold rounded-pill"
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;