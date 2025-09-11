import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Aboutus.css"; // keep if you want custom styles

const AboutUs = () => {
    return (
        <div className="container py-5 about-container">
            {/* Header Section */}
            <section className="text-center mb-5 about-header">
                <h1 className="display-4 fw-bold">About Us</h1>
                <p className="lead text-muted">
                    Welcome to <strong>NextStep Navigation</strong>. We are dedicated to
                    providing the best possible navigation and support for students,
                    graduates, and professionals seeking career guidance and resources.
                </p>
            </section>

            {/* Mission Section */}
            <section className="mb-5 about-mission">
                <h2 className="fw-semibold">Our Mission</h2>
                <p className="text-muted">
                    Our mission is to empower individuals to make informed decisions about
                    their future. We provide a comprehensive and personalized navigation
                    system to help people achieve their goals and aspirations. Our team is
                    dedicated to delivering exceptional support and ensuring client
                    satisfaction. By empowering individuals, we believe we can contribute
                    to a better world for everyone.
                </p>
            </section>

            {/* Team Section */}
            <section className="about-team">
                <h2 className="fw-semibold text-center mb-4">Meet the Team</h2>
                <div className="row g-4 justify-content-center">
                    {[
                        { name: "David", role: "Team Member" },
                        { name: "Joy", role: "Team Member" },
                        { name: "Stephanie", role: "Team Member" },
                        { name: "Phillip", role: "Team Member" },
                        { name: "Haleem", role: "Team Member" },
                    ].map((member, index) => (
                        <div key={index} className="col-md-4 col-sm-6 text-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt={member.name}
                                className="rounded-circle mb-3"
                            />
                            <h5 className="fw-bold">{member.name}</h5>
                            <p className="text-muted">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
