import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCommentDots } from "react-icons/fa";
import "./ContactUs.css";
import animationData from "../assets/animation/contact.json";
import Lottie from "lottie-react";


export default function ContactUs() {
 const [showFeedback, setShowFeedback] = useState(false);
    return (
        <section className="contact-section py-5">
            <div className="container">
                <h1
                    className="text-center mb-4 display-4 fw-bold text-primary"
                    data-aos="fade-down"
                >
                    Contact Us
                </h1>

                {/* <div className="row g-4"> */}
                {/* Contact Info */}
                {/*div className="col-lg-5" data-aos="fade-right">
                        <div className="contact-info card shadow-sm p-4 h-100">
                            <h4 className="fw-bold mb-3">Get in Touch</h4>
                            <p className="text-muted">
                                We'd love to hear from you! Reach out to us through any of the
                                following channels.
                            </p>

                            <ul className="list-unstyled mt-4">
                                <li className="mb-3 d-flex align-items-center">
                                    <FaEnvelope className="text-primary me-3" />
                                    support@example.com
                                </li>
                                <li className="mb-3 d-flex align-items-center">
                                    <FaPhone className="text-primary me-3" />
                                    +234 800 123 4567
                                </li>
                                <li className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="text-primary me-3" />
                                    123 Business Avenue, Lagos, Nigeria
                                </li>
                            </ul>
                        </div>
                    </div> */}

                <div className="row g-4 mt-4 align-items-center">
                     
                <div className="col-md-6 col-lg-5  text-center mb-5 mb-md-0" data-aos="fade-right" data-aos-delay="500">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
                    />
                </div>

                {/* Contact Form (Dummy) */}
                
                <div className="col-12 col-md-10 col-lg-7 mx-auto" data-aos="fade-left">
  <div className="card shadow-sm p-4 rounded-4">
    <h4 className="fw-bold mb-4 text-center text-lg-start">
      Send us a Message
    </h4>

    <form>
      {/* Name Field */}
      <div className="row mb-3">
        <div className="col-lg-3 d-flex align-items-center">
          <label htmlFor="name" className="form-label fw-bold mb-0">
            Name
          </label>
        </div>
        <div className="col-lg-9">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="row mb-3">
        <div className="col-lg-3 d-flex align-items-center">
          <label htmlFor="email" className="form-label fw-bold mb-0">
            Email
          </label>
        </div>
        <div className="col-lg-9">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="row mb-3">
        <div className="col-lg-3 d-flex align-items-start">
          <label htmlFor="message" className="form-label fw-bold mb-0">
            Message
          </label>
        </div>
        <div className="col-lg-9">
          <textarea
            className="form-control"
            id="message"
            rows="4"
            placeholder="Type your message here..."
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="row">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary w-100"
            data-aos="zoom-in"
            onClick={() => alert("This is a dummy form. No data is sent.")}
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  </div>
</div>




                </div>

            </div>

            {/*Google Map Implemented */}
            <div className="mt-5" data-aos="fade-up">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126843.6338021532!2d3.2570704!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4e4e45f4c5b%3A0x6b7bfae6b8b46b0e!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
                    width="100%"
                    height="350"
                    style={{ border: 0, borderRadius: "10px" }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

             {/*Feedback Button */}
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
        </section >
    );
}
