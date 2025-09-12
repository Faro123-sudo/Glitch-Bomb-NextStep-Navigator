// Breadcrumbs.jsx
import React from "react";
import "./Breadcrumbs.css";

const pageTitles = {
  home: "Home",
  careerBank: "Career Bank",
  aboutUs: "About Us",
  quiz: "Interest Quiz",
  multimedia: "Multimedia Guidance",
  resources: "Resources",
  successStories: "Success Stories",
  admissionCoaching: "Admission & Coaching",
  contact: "Contact",
  studentStream: "Stream Selection",
  studentStudyTips: "Study Tips",
  studentScholarships: "Scholarships",
  graduateResume: "Resume Guidelines",
  graduateInternships: "Internships",
  studyAbroad: "Study Abroad",
  proChangePlanner: "Career Change Planner",
  professionalResume: "Resume & LinkedIn",
  professionalMentorship: "Mentorship",
};

const userAreaLabel = {
  student: "Students",
  graduate: "Graduates",
  professional: "Professionals",
};

export default function Breadcrumbs({
  activeSection = "home",
  userType = "",
  extraCrumbs = [],
}) {
  // Base crumbs start with Home
  const crumbs = [{ title: "Home", key: "home" }];

  // UserType breadcrumb (if available)
  if (userType) {
    crumbs.push({ title: userAreaLabel[userType] || "Area", key: userType });
  }

  // Active section (skip if it's home + no userType)
  if (activeSection === "home" && userType) {
    crumbs.push({ title: "Dashboard", key: "dashboard" });
  } else if (activeSection && activeSection !== "home") {
    const title = pageTitles[activeSection] || activeSection.replace(/([A-Z])/g, " $1");
    crumbs.push({ title, key: activeSection });
  }

  // Append extra crumbs dynamically (like filters or sub-pages)
  if (extraCrumbs.length > 0) {
    crumbs.push(...extraCrumbs.map((c, i) => ({ title: c, key: `extra-${i}` })));
  }

  return (
    <nav aria-label="breadcrumb" className="my-3">
      <ol className="breadcrumb">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li
              key={c.key + i}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                c.title
              ) : (
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {c.title}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
