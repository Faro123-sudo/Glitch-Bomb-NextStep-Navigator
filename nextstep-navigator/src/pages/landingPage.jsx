import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation/manWalking.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticFiles/landingPage.css";


function LandingPage() {
    return (
        <>
            <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* Header */}
                        <div className="col-12 text-center mb-4">
                            <h1 className="display-4 fw-bold text-primary mb-3">
                                Welcome to NextStep Navigator
                            </h1>
                            <h2 className="fw-semibold text-secondary">
                                Your Guide to the Future
                            </h2>
                        </div>

                        {/* Lottie Animation */}
                        <div className="col-md-5 text-center me-2 mb-5 mb-md-0">
                            <div className="lottie-container mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                                    style={{ width: "300px", height: "300px" }}
                                >
                                    <Lottie
                                        animationData={animationData}
                                        loop={true}
                                        style={{ width: "300px", height: "auto" }}
                                    />
                                </div>
                            </div>
                            <p className="text-muted px-3">
                                Discover your path with personalized guidance and career insights tailored just for you.
                            </p>
                        </div>

                        {/* Dummy Form */}
                        <div className="col-md-7 col-lg-5">
                            <div className="form-container p-4 p-md-5 shadow rounded">
                                <form action="#" method="POST">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-medium">
                                            Enter Your Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control form-control-lg"
                                            placeholder="e.g., John Doe"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-medium">
                                            Enter Your Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="e.g., john.doe@example.com"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="contact" className="form-label fw-medium">
                                            Enter Your Contact:
                                        </label>
                                        <input
                                            type="tel"
                                            id="contact"
                                            name="contact"
                                            className="form-control form-control-lg"
                                            placeholder="e.g., (123) 456-7890"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <p className="fw-medium">I am a:</p>
                                        <div className="form-check mb-2 w-auto">
                                            <input className="form-check-input" type="checkbox" id="student" />
                                            <label className="form-check-label" htmlFor="student">
                                                Student (Grade 8-12)
                                            </label>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input className="form-check-input" type="checkbox" id="graduate" />
                                            <label className="form-check-label" htmlFor="graduate">
                                                Graduate (UG/PG)
                                            </label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" id="working" />
                                            <label className="form-check-label" htmlFor="working">
                                                Working Professional
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <small className="text-muted">
                                            We'll never share your contact information.
                                        </small>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg w-100 py-2 fw-bold">
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
}

export default LandingPage;
