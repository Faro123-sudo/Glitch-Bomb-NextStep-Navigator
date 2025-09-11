import React from "react";
import Lottie from "lottie-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticFiles/landingPage.css";


function LandingPage() {
    return (
        <>
            <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        
                        <div className="col-12 text-center mb-4" data-aos="fade-up" data-aos-delay="300">
                            <h1 className="display-4 fw-bold text-primary mb-3" data-aos="zoom-in" data-aos-delay="300">
                                Welcome to David
                            </h1>
                            <h2 className="fw-semibold text-secondary">
                                Your Guide to the Future
                            </h2>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
