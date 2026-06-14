import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import MergePdf from './MergePdf';
import SplitPdf from './SplitPdf';
import RotatePdf from './RotatePdf';
import WatermarkPdf from './WatermarkPdf';
import WordToPdf from './WordToPdf';
import PowerPointToPdf from './PowerPointToPdf';
import ExcelToPdf from './ExcelToPdf';
import JpgToPdf from './JpgToPdf';
import CompressPdf from './CompressPdf';
import UnlockPdf from './UnlockPdf';

import './MainPage.css';

const tools = [
  { component: <MergePdf />, key: 'merge' },
  { component: <SplitPdf />, key: 'split' },
  { component: <CompressPdf />, key: 'compress' },
  { component: <UnlockPdf />, key: 'unlock' },
  { component: <WordToPdf />, key: 'word' },
  { component: <PowerPointToPdf />, key: 'ppt' },
  { component: <ExcelToPdf />, key: 'excel' },
  { component: <JpgToPdf />, key: 'jpg' },
  { component: <RotatePdf />, key: 'rotate' },
  { component: <WatermarkPdf />, key: 'watermark' },
];

const MainPage = () => {
  return (
    <div className="main-wrapper">
      {/* ——— HERO ——— */}
      <div className="hero-section">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          100% Free &amp; Secure PDF Tools
        </div>

        <Typography
          variant="h1"
          className="main-title"
        >
          Every PDF tool you'll<br />ever need
        </Typography>

        <p className="hero-subtitle">
          Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          All processing happens in your browser — your files never leave your device.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">10+</span>
            <span className="hero-stat-label">PDF Tools</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">100%</span>
            <span className="hero-stat-label">Free Forever</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">0</span>
            <span className="hero-stat-label">Data Stored</span>
          </div>
        </div>
      </div>

      {/* ——— TOOLS GRID ——— */}
      <Container maxWidth="lg" sx={{ pb: 12 }}>
        <p className="section-label">All Tools</p>
        <p className="section-title">Pick a tool and get started instantly</p>

        <Grid container spacing={3} justifyContent="center" className="cards-grid">
          {tools.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.key} sx={{ display: 'flex' }}>
              {item.component}
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ——— FEATURES STRIP ——— */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', background: '#fff' }}>
        <Container maxWidth="lg">
          <div className="features-strip">
            {[
              { icon: '🔒', label: 'Files never uploaded' },
              { icon: '⚡', label: 'Instant processing' },
              { icon: '🆓', label: 'Completely free' },
              { icon: '📱', label: 'Works on all devices' },
            ].map((f) => (
              <div className="feature-badge" key={f.label}>
                <span className="feature-badge-icon">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
