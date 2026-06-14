import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const menuItems = [
  { label: 'Merge PDF', link: '/merge-pdf' },
  { label: 'Split PDF', link: '/split-pdf' },
  { label: 'Compress PDF', link: '/compress-pdf' },
  { label: 'Word to PDF', link: '/word-to-pdf' },
  { label: 'Excel to PDF', link: '/excel-to-pdf' },
  { label: 'PPT to PDF', link: '/ppt-to-pdf' },
  { label: 'Image to PDF', link: '/image-to-pdf' },
  { label: 'Unlock PDF', link: '/unlock-pdf' },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <button className="logo-btn" onClick={() => navigate('/')}>
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <span className="logo-text">PDF<span className="logo-accent">Studio</span></span>
          </button>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.link}
                onClick={() => navigate(item.link)}
                className={`nav-link ${location.pathname === item.link ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          {menuItems.map((item) => (
            <button
              key={item.link}
              onClick={() => navigate(item.link)}
              className={`mobile-nav-link ${location.pathname === item.link ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {menuOpen && <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

export default Header;
