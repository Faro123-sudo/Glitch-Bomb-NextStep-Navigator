import { useState } from 'react'
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import LandPage from './LandingPage.jsx';
import CareerBank from "./CareerBank";
import Quiz from "./Quiz";
import Multimedia from "./MultimediaGuidance";
import Resources from "./ResourceLibrary";
import SuccessStories from "./SuccessStories";
import AdmissionCoaching from "./AdmissionAndCoaching";
import AboutUs from './Aboutus.jsx';
import ContactUs from './Contact.jsx';

function DisplayPages() {

  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    // if (!data.career_bank) {
    //   return <p className="text-center text-gray-500">Loading...</p>;
    // }
    switch (activeSection) {
      case 'careerBank':
        return <CareerBank />;
      case 'aboutUs':
        return <AboutUs />;
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
        return <HomePage />;
      case 'contact':
        return <ContactUs />;
      default:
        return <HomePage />;
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

export default DisplayPages;
