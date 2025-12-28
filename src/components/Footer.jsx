import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        CareerNest
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Find your dream job with the world's most trusted career platform.
                    </p>
                    <div className="footer-social">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">gh</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
                    </div>
                </div>
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/companies">Companies</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Support</h3>
                    <ul className="footer-links">
                        <li><Link to="#">Help Center</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} CareerNest. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
