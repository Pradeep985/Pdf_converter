import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const categories = [
  {
    title: 'Organize PDF',
    links: [
      { label: 'Merge PDF', path: '/merge-pdf' },
      { label: 'Split PDF', path: '/split-pdf' },
      { label: 'Remove Pages', path: '/remove-pages' },
      { label: 'Organize PDF', path: '/organize-pdf' },
    ]
  },
  {
    title: 'Optimize PDF',
    links: [
      { label: 'Compress PDF', path: '/compress-pdf' },
      { label: 'Repair PDF', path: '/repair-pdf' },
    ]
  },
  {
    title: 'Convert to PDF',
    links: [
      { label: 'JPG to PDF', path: '/image-to-pdf' },
      { label: 'Word to PDF', path: '/word-to-pdf' },
      { label: 'PowerPoint to PDF', path: '/ppt-to-pdf' },
      { label: 'Excel to PDF', path: '/excel-to-pdf' },
      { label: 'HTML to PDF', path: '/html-to-pdf' },
    ]
  },
  {
    title: 'Convert from PDF',
    links: [
      { label: 'PDF to JPG', path: '/pdf-to-jpg' },
      { label: 'PDF to Word', path: '/pdf-to-word' },
    ]
  },
  {
    title: 'Edit PDF',
    links: [
      { label: 'Rotate PDF', path: '/rotate-pdf' },
      { label: 'Add Page Numbers', path: '/add-page-numbers' },
      { label: 'Watermark PDF', path: '/watermark-pdf' },
    ]
  },
  {
    title: 'PDF Security',
    links: [
      { label: 'Unlock PDF', path: '/unlock-pdf' },
      { label: 'Protect PDF', path: '/protect-pdf' },
      { label: 'Sign PDF', path: '/sign-pdf' },
    ]
  }
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => { 
    setMenuOpen(false); 
    setMegaMenuOpen(false);
  }, [location]);

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
            <div 
              className="mega-menu-trigger"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="nav-link dropdown-btn">
                All PDF Tools <span className="chevron">▼</span>
              </button>
              
              {/* Mega Menu */}
              {megaMenuOpen && (
                <div className="mega-menu">
                  <div className="mega-menu-grid">
                    {categories.map((cat, idx) => (
                      <div key={idx} className="mega-menu-column">
                        <h4 className="mega-menu-title">{cat.title}</h4>
                        <ul className="mega-menu-list">
                          {cat.links.map(link => (
                            <li key={link.path}>
                              <button 
                                onClick={() => navigate(link.path)}
                                className={`mega-menu-link ${location.pathname === link.path ? 'active' : ''}`}
                              >
                                {link.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className={`nav-link ${location.pathname === '/compress-pdf' ? 'active' : ''}`} onClick={() => navigate('/compress-pdf')}>Compress</button>
            <button className={`nav-link ${location.pathname === '/merge-pdf' ? 'active' : ''}`} onClick={() => navigate('/merge-pdf')}>Merge</button>
            <button className={`nav-link ${location.pathname === '/split-pdf' ? 'active' : ''}`} onClick={() => navigate('/split-pdf')}>Split</button>
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
          {categories.map((cat, idx) => (
            <div key={idx} className="mobile-category">
              <h4 className="mobile-category-title">{cat.title}</h4>
              <div className="mobile-links-grid">
                {cat.links.map(link => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {menuOpen && <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

export default Header;
