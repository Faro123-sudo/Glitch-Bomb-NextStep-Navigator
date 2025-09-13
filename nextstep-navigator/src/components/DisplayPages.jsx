import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import HomePage from "./HomePage";
import CareerBank from "./CareerBank";
import Quiz from "./Quiz";
import Multimedia from "./MultimediaGuidance";
import Resources from "./ResourceLibrary";
import SuccessStories from "./SuccessStories";
import AdmissionCoaching from "./AdmissionAndCoaching";
import AboutUs from "./Aboutus";
import ContactUs from "./Contact";
import Footer from "./Footer";
import Feedback from "./Feedback";

function DisplayPages() {
  const [userType, setUserType] = useState(() => sessionStorage.getItem("userType") || "guest");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userType) sessionStorage.setItem("userType", userType);
    else sessionStorage.removeItem("userType");
  }, [userType]);

  const handleNavigate = (page) => {
    navigate(page === "home" ? "/" : `/${page}`);
  };

  const activeSection = location.pathname === "/" ? "home" : location.pathname.replace("/", "");

  return (
    <>
      <Header 
        onNavigate={handleNavigate} 
        activePage={activeSection} 
        userType={userType} 
        setUserType={setUserType} 
      />
      <main className="container">
        <Breadcrumbs activeSection={activeSection} userType={userType} onNavigate={handleNavigate} />

        <div className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage onNavigate={handleNavigate} userType={userType} />} />
            <Route path="/careerBank" element={<CareerBank userType={userType} />} />
            <Route path="/quiz" element={<Quiz userType={userType} />} />
            <Route path="/multimedia" element={<Multimedia userType={userType} />} />
            <Route path="/resources" element={<Resources userType={userType} />} />
            <Route path="/successStories" element={<SuccessStories userType={userType} />} />
            <Route path="/admissionCoaching" element={<AdmissionCoaching userType={userType} />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </main>
      <Footer onNavigate={handleNavigate} />
      <Feedback />
    </>
  );
}

export default DisplayPages;
