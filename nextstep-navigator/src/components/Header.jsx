import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("home"); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (page) => {
    setActivePage(page);
    onNavigate(page);
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Career Bank", page: "careerBank" },
    { label: "About Us", page: "aboutUs" },
    { label: "Quiz", page: "quiz" },
    { label: "Multimedia", page: "multimedia" },
    { label: "Resources", page: "resources" },
    { label: "Success Stories", page: "successStories" },
    { label: "Admission & Coaching", page: "admissionCoaching" },
    { label: "Logout", page: "logout" },
  ];

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.25,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  return (
    <header className="bg-white text-dark shadow-sm sticky-top z-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white container">
        {/* Logo */}
        <h1
          className="navbar-brand h1 ms-4 mb-0 me-auto fs-3 fw-bold ps-4 ps-lg-0"
          onClick={() => handleNavigation("home")}
          style={{ cursor: 'pointer' }}
        >
          NextStep<span className="text-primary">.</span>
        </h1>

        {/* Mobile Toggler Button */}
        <button
          className="navbar-toggler border-0 p-0 me-4 me-lg-0"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="d-none d-lg-block">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-column flex-lg-row align-items-center">
            {navLinks.map((link) => (
              <li className="nav-item mx-lg-2" key={link.page}>
                <button
                  onClick={() => handleNavigation(link.page)}
                  className={`btn nav-link position-relative rounded-pill text-dark px-3 py-2
                    ${activePage === link.page ? "active fw-bold text-primary" : "text-dark"}
                  `}
                >
                  {link.label}
                  {/* Active underline */}
                  {activePage === link.page && (
                    <motion.div
                      layoutId="underline"
                      className="position-absolute bottom-0 start-50 translate-middle-x bg-primary"
                      style={{ height: '2px', width: '100%' }}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="d-lg-none position-absolute w-100 start-0 bg-white py-2 shadow-lg mt-2 z-3"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="d-flex flex-column align-items-center">
              {navLinks.map((link) => (
                <motion.button
                  key={link.page}
                  onClick={() => handleNavigation(link.page)}
                  className={`btn w-100 text-center fw-medium py-3
                    ${activePage === link.page
                      ? "bg-light text-primary fw-bold"
                      : "text-dark hover-effect"
                    }
                  `}
                  variants={itemVariants}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;