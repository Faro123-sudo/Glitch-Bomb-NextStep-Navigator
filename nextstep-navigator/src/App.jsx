import { BrowserRouter as Router } from "react-router-dom";
import DisplayPages from "./components/DisplayPages";
import LandingPage from "./components/LandingPage";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const username = sessionStorage.getItem("username");
    if (username) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <DisplayPages />
      ) : (
        <LandingPage onNavigate={() => setIsAuthenticated(true)} />
      )}
    </Router>
  );
}

export default App;
