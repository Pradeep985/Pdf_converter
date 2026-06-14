import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import './MainPage.css';

// ——— ORGANIZE PDF ———
import MergePdf from './MergePdf';
import SplitPdf from './SplitPdf';
import RemovePages from './RemovePages';
import OrganizePdf from './OrganizePdf';

// ——— OPTIMIZE PDF ———
import CompressPdf from './CompressPdf';
import RepairPdf from './RepairPdf';

// ——— CONVERT TO PDF ———
import JpgToPdf from './JpgToPdf';
import WordToPdf from './WordToPdf';
import PowerPointToPdf from './PowerPointToPdf';
import ExcelToPdf from './ExcelToPdf';
import HtmlToPdf from './HtmlToPdf';

// ——— CONVERT FROM PDF ———
import PdfToJpg from './PdfToJpg';
import PdfToWord from './PdfToWord';

// ——— EDIT PDF ———
import RotatePdf from './RotatePdf';
import AddPageNumbers from './AddPageNumbers';
import WatermarkPdf from './WatermarkPdf';

// ——— PDF SECURITY ———
import UnlockPdf from './UnlockPdf';
import ProtectPdf from './ProtectPdf';
import SignPdf from './SignPdf';

const categories = [
  {
    label: 'Organize PDF',
    icon: '📁',
    color: '#dbeafe',
    tools: [
      { component: <MergePdf />, key: 'merge' },
      { component: <SplitPdf />, key: 'split' },
      { component: <RemovePages />, key: 'remove' },
      { component: <OrganizePdf />, key: 'organize' },
    ],
  },
  {
    label: 'Optimize PDF',
    icon: '⚡',
    color: '#dcfce7',
    tools: [
      { component: <CompressPdf />, key: 'compress' },
      { component: <RepairPdf />, key: 'repair' },
    ],
  },
  {
    label: 'Convert to PDF',
    icon: '📄',
    color: '#fef3c7',
    tools: [
      { component: <JpgToPdf />, key: 'jpg' },
      { component: <WordToPdf />, key: 'word' },
      { component: <PowerPointToPdf />, key: 'ppt' },
      { component: <ExcelToPdf />, key: 'excel' },
      { component: <HtmlToPdf />, key: 'html' },
    ],
  },
  {
    label: 'Convert from PDF',
    icon: '🔄',
    color: '#f3e8ff',
    tools: [
      { component: <PdfToJpg />, key: 'pdf-to-jpg' },
      { component: <PdfToWord />, key: 'pdf-to-word' },
    ],
  },
  {
    label: 'Edit PDF',
    icon: '✏️',
    color: '#ffedd5',
    tools: [
      { component: <RotatePdf />, key: 'rotate' },
      { component: <AddPageNumbers />, key: 'page-numbers' },
      { component: <WatermarkPdf />, key: 'watermark' },
    ],
  },
  {
    label: 'PDF Security',
    icon: '🔒',
    color: '#fce7f3',
    tools: [
      { component: <UnlockPdf />, key: 'unlock' },
      { component: <ProtectPdf />, key: 'protect' },
      { component: <SignPdf />, key: 'sign' },
    ],
  },
];

const MainPage = () => {
  const [stats, setStats] = useState({ total_processed: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const url = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${url}/api/stats`);
        if (res.data) setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="main-wrapper">

      {/* ——— HERO ——— */}
      <div className="hero-section">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          100% Free &amp; Secure PDF Tools
        </div>

        <Typography variant="h1" className="main-title">
          Every PDF tool you'll<br />ever need
        </Typography>

        <p className="hero-subtitle">
          Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          All processing happens in your browser — your files never leave your device.
        </p>

        <div className="hero-stats">
          {[
            { num: '18+', label: 'PDF Tools' },
            { num: '100%', label: 'Free Forever' },
            { num: stats.total_processed > 0 ? stats.total_processed.toLocaleString() : '10,000+', label: 'PDFs Processed' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <span className="hero-stat-number">{s.num}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ——— CATEGORY TOOL GRID ——— */}
      <div className="tools-section">
        <Container maxWidth="xl">
          {categories.map((cat) => (
            <div className="category-block" key={cat.label}>
              <div className="category-header">
                <div className="category-icon-wrap" style={{ background: cat.color }}>
                  {cat.icon}
                </div>
                <Typography className="category-title">{cat.label}</Typography>
              </div>
              <Grid container spacing={2} className="cards-grid">
                {cat.tools.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.key} sx={{ display: 'flex' }}>
                    {item.component}
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Container>
      </div>

      {/* ——— FEATURES STRIP ——— */}
      <div className="features-strip">
        {[
          { icon: '🔒', label: 'Files never uploaded' },
          { icon: '⚡', label: 'Instant processing' },
          { icon: '🆓', label: 'Completely free' },
          { icon: '📱', label: 'Works on all devices' },
        ].map(f => (
          <div className="feature-badge" key={f.label}>
            <span>{f.icon}</span>
            {f.label}
          </div>
        ))}
      </div>

    </div>
  );
};

export default MainPage;
