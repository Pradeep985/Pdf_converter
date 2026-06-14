import React from 'react';
import { useNavigate } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <span className="footer-logo-text">PDF<span className="footer-logo-accent">Studio</span></span>
            </div>
            <p className="footer-description">
              Every tool you need to work with PDFs in one place. All tools are 100% free and process files securely in your browser.
            </p>
            <div className="footer-socials">
              <button className="social-btn">X</button>
              <button className="social-btn">in</button>
              <button className="social-btn">gh</button>
            </div>
          </div>

          {/* Column 1 */}
          <div className="footer-col">
            <h4>Organize & Edit</h4>
            <ul>
              <li><button onClick={() => navigate('/merge-pdf')} className="footer-link-btn">Merge PDF</button></li>
              <li><button onClick={() => navigate('/split-pdf')} className="footer-link-btn">Split PDF</button></li>
              <li><button onClick={() => navigate('/remove-pages')} className="footer-link-btn">Remove Pages</button></li>
              <li><button onClick={() => navigate('/organize-pdf')} className="footer-link-btn">Organize PDF</button></li>
              <li><button onClick={() => navigate('/rotate-pdf')} className="footer-link-btn">Rotate PDF</button></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4>Convert</h4>
            <ul>
              <li><button onClick={() => navigate('/image-to-pdf')} className="footer-link-btn">JPG to PDF</button></li>
              <li><button onClick={() => navigate('/word-to-pdf')} className="footer-link-btn">Word to PDF</button></li>
              <li><button onClick={() => navigate('/pdf-to-word')} className="footer-link-btn">PDF to Word</button></li>
              <li><button onClick={() => navigate('/pdf-to-jpg')} className="footer-link-btn">PDF to JPG</button></li>
              <li><button onClick={() => navigate('/html-to-pdf')} className="footer-link-btn">HTML to PDF</button></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4>Security & Optimize</h4>
            <ul>
              <li><button onClick={() => navigate('/compress-pdf')} className="footer-link-btn">Compress PDF</button></li>
              <li><button onClick={() => navigate('/repair-pdf')} className="footer-link-btn">Repair PDF</button></li>
              <li><button onClick={() => navigate('/unlock-pdf')} className="footer-link-btn">Unlock PDF</button></li>
              <li><button onClick={() => navigate('/protect-pdf')} className="footer-link-btn">Protect PDF</button></li>
              <li><button onClick={() => navigate('/sign-pdf')} className="footer-link-btn">Sign PDF</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-copyright">
            © {year} PDFStudio. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
