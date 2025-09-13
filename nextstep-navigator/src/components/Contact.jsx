import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCommentDots } from "react-icons/fa";
import "./ContactUs.css";
import animationData from "../assets/animation/contact.json";
import Lottie from "lottie-react";


export default function ContactUs() {
  return (
    <section className="contact-section py-5">
      <div className="container">
        <h1
          className="text-center mb-4 display-4 fw-bold text-primary"
          data-aos="fade-down"
        >
          Contact Us
        </h1>



        <div className="row g-4 mt-4 align-items-center">

          <div className="col-md-6 col-lg-5  text-center mb-5 mb-md-0" data-aos="fade-right" data-aos-delay="500">
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
            />
          </div>

          <div className="col-12 col-md-10 col-lg-7 mx-auto" data-aos="fade-left">
            <div className="card shadow-sm p-4 rounded-4">
              <h4 className="fw-bold mb-4 text-center text-lg-start">
                Send us a Message
              </h4>

    <form>
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

    </section >
  );
}
