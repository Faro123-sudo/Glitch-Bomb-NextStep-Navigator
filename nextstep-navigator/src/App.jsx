import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage.jsx";
import DisplayPages from "./components/DisplayPages.jsx";
import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <>
      {showHome ? (
        <DisplayPages />
      ) : (
        <LandingPage onNavigate={() => setShowHome(true)} />
      )}
    </>
  );
}

export default App;
