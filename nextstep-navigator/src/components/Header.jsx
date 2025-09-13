import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.webp";
import menuData from "../data/menuData.json";
import "./Header.css";

const Header = ({ userType = "guest" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    setActivePage(path);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleNavigation = (page) => {
    navigate(`/${page === "home" ? "" : page}`);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const navLinks = menuData[userType?.toLowerCase()] || menuData["guest"];

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 40, staggerChildren: 0.05, delayChildren: 0.1 },
    },
    closed: { opacity: 0, y: -20, transition: { duration: 0.25 } },
  };

  const itemVariants = { open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -10 } };

  return (
    <header className="sticky-top z-3">
      <div className="container floating-navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light rounded-navbar">
          <div className="d-flex align-items-center w-100">
            <div className="d-flex align-items-center me-auto">
              <img
                src={Logo}
                alt="NextStep Navigator Logo"
                className="me-2"
                style={{ height: "50px", cursor: "pointer" }}
                onClick={() => handleNavigation("home")}
              />
            </div>

<div className="d-none d-lg-flex align-items-center flex-grow-1">
  <ul className="navbar-nav mb-2 mb-lg-0 d-flex flex-row align-items-center mx-auto">
    {navLinks.map((link) => {
      const IconComponent = Icons[link.icon] || Icons.Circle;
      return (
        <li className="nav-item mx-lg-1 position-relative" key={link.page}>
          <button
            onClick={() => handleNavigation(link.page)}
            className={`btn nav-link rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${
              activePage === link.page ? "fw-bold text-primary" : "text-dark"
            }`}
          >
            <IconComponent size={18} />
            {link.label}
            {activePage === link.page && (
              <motion.div
                layoutId="underline"
                className="position-absolute bottom-0 start-50 translate-middle-x bg-primary"
                style={{ height: "3px", width: "60%", borderRadius: "2px" }}
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </li>
      );
    })}
  </ul>

  {username && (
    <div className="d-flex align-items-center ps-3 border-start ms-2">
      <User size={20} className="text-primary me-2" />
      <span className="fw-semibold text-secondary">{username}</span>
    </div>
  )}
</div>


            <button className="navbar-toggler border-0 p-0 ms-3 d-lg-none" type="button" onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="d-lg-none position-absolute w-100 start-0 shadow-lg mt-2 z-3 mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                style={{ top: "100%" }}
              >
                <div className="d-flex flex-column align-items-center py-2">
                  {username && (
                    <div className="d-flex align-items-center py-3 text-primary fw-bold">
                      <User size={20} className="me-2" />
                      <span>{username}</span>
                    </div>
                  )}
                  {navLinks.map((link) => {
                    const IconComponent = Icons[link.icon] || Icons.Circle;
                    return (
                      <motion.button
                        key={link.page}
                        onClick={() => handleNavigation(link.page)}
                        className={`btn w-100 text-center fw-medium py-3 d-flex justify-content-center gap-2 ${
                          activePage === link.page ? "bg-light text-primary fw-bold" : "text-dark"
                        }`}
                        variants={itemVariants}
                      >
                        <IconComponent size={18} />
                        {link.label}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Header;
