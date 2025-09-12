// Breadcrumbs.jsx
import React from "react";

/**
 * Breadcrumbs builds a simple trail from activeSection + userType.
 * - activeSection: the key you use in DisplayPages (e.g., 'careerBank','quiz','home')
 * - userType: 'student' | 'graduate' | 'professional' | ''
 *
 * It returns an array like: Home › Students › Interest Quiz
 */

const pageTitles = {
  home: "Home",
  careerBank: "Career Bank",
  aboutUs: "About Us",
  quiz: "Interest Quiz",
  multimedia: "Multimedia",
  resources: "Resources",
  successStories: "Success Stories",
  admissionCoaching: "Admission & Coaching",
  contact: "Contact",
  // placeholders for user-specific pages (add components if you create them)
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

export default function Breadcrumbs({ activeSection = "home", userType = "" }) {
  // Build crumbs
  const crumbs = [{ title: "Home", key: "home" }];

  if (userType) {
    crumbs.push({ title: userAreaLabel[userType] || "Area", key: userType });
  }

  // If activeSection is 'home' but userType present, show Dashboard as last crumb
  if (activeSection === "home" && userType) {
    crumbs.push({ title: "Dashboard", key: "dashboard" });
  } else if (activeSection && activeSection !== "home") {
    // Show mapped title (if exists) else humanize the key
    const title = pageTitles[activeSection] || activeSection.replace(/([A-Z])/g, " $1");
    crumbs.push({ title, key: activeSection });
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
              {isLast ? c.title : <a href="#" onClick={(e) => e.preventDefault()}>{c.title}</a>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
