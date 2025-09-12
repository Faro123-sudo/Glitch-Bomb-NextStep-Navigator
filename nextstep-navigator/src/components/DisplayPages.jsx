// DisplayPages.jsx
import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import HomePage from "./HomePage.jsx";
import CareerBank from "./CareerBank";
import Quiz from "./Quiz";
import Multimedia from "./MultimediaGuidance";
import Resources from "./ResourceLibrary";
import SuccessStories from "./SuccessStories";
import AdmissionCoaching from "./AdmissionAndCoaching";
import AboutUs from "./Aboutus.jsx";
import ContactUs from "./Contact.jsx";
import Footer from "./Footer.jsx";
import Feedback from "./Feedback.jsx";

// New: pages you might create later (placeholders)
// import StudentStream from "./StudentStream";
// import StudentStudyTips from "./StudentStudyTips";
// import GraduateResume from "./GraduateResume";
// etc.

function DisplayPages() {
  const [activeSection, setActiveSection] = useState("home");
  const [userType, setUserType] = useState(() => sessionStorage.getItem("userType") || "");

  useEffect(() => {
    if (userType) sessionStorage.setItem("userType", userType);
    else sessionStorage.removeItem("userType");
  }, [userType]);

  const renderSection = () => {
    switch (activeSection) {
      case "careerBank":
        return <CareerBank userType={userType} />;
      case "aboutUs":
        return <AboutUs />;
      case "quiz":
        return <Quiz userType={userType} />;
      case "multimedia":
        return <Multimedia userType={userType} />;
      case "resources":
        return <Resources userType={userType} />;
      case "successStories":
        return <SuccessStories userType={userType} />;
      case "admissionCoaching":
        return <AdmissionCoaching userType={userType} />;
      case "contact":
        return <ContactUs />;
      case "studentStream":
        return <div>Student Stream page (create <strong>StudentStream</strong> component)</div>;
      case "studentStudyTips":
        return <div>Student Study Tips (create component)</div>;
      case "studentScholarships":
        return <div>Student Scholarships (create component)</div>;
      case "graduateResume":
        return <div>Graduate Resume page (create component)</div>;
      case "proChangePlanner":
        return <div>Professional Change Planner (create component)</div>;
      case "home":
      default:
        return <HomePage userType={userType} />;
    }
  };

  return (
    <>
      <Header onNavigate={setActiveSection} activePage={activeSection} userType={userType} setUserType={setUserType} />
      <main className="container">
        {/* Breadcrumbs under Header */}
        <Breadcrumbs activeSection={activeSection} userType={userType} />
        <div className="max-w-4xl mx-auto p-4">{renderSection()}</div>
      </main>
      <Footer onNavigate={setActiveSection} />
      <Feedback />
    </>
  );
}

export default DisplayPages;
