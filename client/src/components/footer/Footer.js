import React from 'react';
import { useNavigate } from 'react-router-dom';
import './footer.css';

const toolLinks = [
  { label: 'Merge PDF', link: '/merge-pdf' },
  { label: 'Split PDF', link: '/split-pdf' },
  { label: 'Compress PDF', link: '/compress-pdf' },
  { label: 'Unlock PDF', link: '/unlock-pdf' },
  { label: 'Rotate PDF', link: '/rotate-pdf' },
  { label: 'Watermark PDF', link: '/watermark-pdf' },
  { label: 'Word to PDF', link: '/word-to-pdf' },
  { label: 'Excel to PDF', link: '/excel-to-pdf' },
  { label: 'PPT to PDF', link: '/ppt-to-pdf' },
  { label: 'Image to PDF', link: '/image-to-pdf' },
];

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <button className="footer-logo" onClick={() => navigate('/')}>
            <div className="footer-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span>PDF<span style={{ color: '#4f46e5' }}>Studio</span></span>
          </button>
          <p className="footer-brand-desc">
            Free, powerful PDF tools that work entirely in your browser. No file uploads, no data stored. Built for privacy.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">🔒 Private</span>
            <span className="footer-badge">⚡ Fast</span>
            <span className="footer-badge">🆓 Free</span>
          </div>
        </div>

        {/* Tools Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">PDF Tools</h4>
          <div className="footer-links-grid">
            {toolLinks.map((t) => (
              <button key={t.link} className="footer-link" onClick={() => navigate(t.link)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© {year} PDFStudio. All rights reserved.</p>
        <p className="footer-tagline">Crafted with ❤️ for productivity</p>
      </div>
    </footer>
  );
};

export default Footer;
