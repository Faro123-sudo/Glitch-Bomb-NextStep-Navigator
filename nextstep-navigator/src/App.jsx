import { useState, useEffect } from 'react'
import LandPage from './components/landingPage.jsx'
import Header from './components/Header.jsx';
import CareerBank from "./components/CareerBank";
import Quiz from "./components/Quiz";
import Multimedia from "./components/MultimediaGuidance";
import Resources from "./components/ResourceLibrary";
import SuccessStories from "./components/SuccessStories";
import AdmissionCoaching from "./components/AdmissionAndCoaching";

import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);

  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    // if (!data.career_bank) {
    //   return <p className="text-center text-gray-500">Loading...</p>;
    // }
    switch (activeSection) {
      case 'careerBank':
        return <CareerBank />;
      case 'quiz':
        return <Quiz />;
      case 'multimedia':
        return <Multimedia />;
      case 'resources':
        return <Resources />;
      case 'successStories':
        return <SuccessStories />;
      case 'admissionCoaching':
        return <AdmissionCoaching />;
      case 'home':
        return <LandPage />;
      default:
        return <LandPage />;
    }
  };

  return (
    <>
      {/* <LandPage></LandPage> */}
      <Header onNavigate={setActiveSection} />
      <main className="max-w-4xl mx-auto p-4">{renderSection()}</main>

    </>
  )
}

export default App
