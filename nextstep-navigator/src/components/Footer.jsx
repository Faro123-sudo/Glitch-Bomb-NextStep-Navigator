import React from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Logo from '../assets/logo.webp';
import './Footer.css';
import GeoClock from './GeoClock';

const Footer = ({ onNavigate }) => {
  const handleNavClick = (e, page) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (<>
      <hr style={{marginBottom: '20px'}}/>
    <footer className="footer-section text-dark pt-4 pb-3">
      <div className="container-fluid px-lg-5 px-4" style={{backgroundColor: '#fff'}}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img src={Logo} alt="NextStep Navigator Logo" style={{ height: '40px' }} />
              <h5 className="ms-2 mb-0 fw-bold">NextStep Navigator</h5>
            </div>
            <p className="text-muted">Your guide to a successful and fulfilling career journey. Explore, learn, and grow with us.</p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-heading mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'home')} className="footer-link">Home</a></li>
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'aboutUs')} className="footer-link">About Us</a></li>
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'careerBank')} className="footer-link">Career Bank</a></li>
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'contact')} className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-heading mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'quiz')} className="footer-link">Career Quiz</a></li>
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'resources')} className="footer-link">Resource Library</a></li>
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'successStories')} className="footer-link">Success Stories</a></li>
              <li><a href="#!" onClick={(e) => handleNavClick(e, 'multimedia')} className="footer-link">Multimedia Guidance</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-heading mb-3">Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="social-icon me-3"><FaTwitter /></a>
              <a href="#" className="social-icon me-3"><FaLinkedin /></a>
              <a href="#" className="social-icon me-3"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="row mt-3 align-items-center border-top border-light pt-3">
          <div className="col-lg-6 col-md-12 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start">
            <GeoClock compact={true} />
          </div>
          <div className="col-lg-6 col-md-12 text-center text-lg-end">
            <p className="text-muted mb-0">&copy; {new Date().getFullYear()} NextStep Navigator. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;