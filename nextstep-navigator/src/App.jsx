import { useState, useEffect } from 'react'
import LandPage from './pages/landingPage.jsx'
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

  return (
    <>
      <LandPage></LandPage>
    </>
  )
}

export default App
