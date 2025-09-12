import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage.jsx";
import DisplayPages from "./components/DisplayPages.jsx";
import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });

    // Check if user data exists in session storage
    const username = sessionStorage.getItem("username");
    if (username) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <DisplayPages />
      ) : (
        <LandingPage onNavigate={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;
