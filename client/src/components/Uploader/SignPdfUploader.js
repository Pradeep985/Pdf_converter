import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, TextField } from '@mui/material';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import DrawIcon from '@mui/icons-material/Draw';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const POSITIONS = [
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Center', value: 'bottom-center' },
];

const SignPdfUploader = () => {
  const [file, setFile] = useState(null);
  const [signText, setSignText] = useState('');
  const [position, setPosition] = useState('bottom-right');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSign = async () => {
    if (!file) return;
    if (!signText.trim()) { setError('Please enter your signature text.'); return; }
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.TimesRomanItalic);
      const pages = doc.getPages();
      const lastPage = pages[pages.length - 1];
      const { width } = lastPage.getSize();
      const fontSize = 20;
      const textWidth = font.widthOfTextAtSize(signText, fontSize);
      const margin = 36;
      let x, y;
      if (position === 'bottom-right') { x = width - textWidth - margin; y = margin + 16; }
      else if (position === 'bottom-left') { x = margin; y = margin + 16; }
      else { x = (width - textWidth) / 2; y = margin + 16; }
      // Draw underline
      lastPage.drawLine({ start: { x, y: y - 4 }, end: { x: x + textWidth, y: y - 4 }, thickness: 1, color: rgb(0.31, 0.27, 0.90) });
      // Draw signature text
      lastPage.drawText(signText, { x, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.5) });
      const out = await doc.save();
      saveAs(new Blob([out], { type: 'application/pdf' }), `signed_${file.name}`);
      setFile(null); setSignText('');
    } catch {
      setError('Failed to sign the PDF. Please try again.');
    } finally { setLoading(false); }
  };

  const onDrop = useCallback((accepted) => { if (accepted[0]) { setFile(accepted[0]); setError(''); } }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><DrawIcon /></div>
        <Typography className="uploader-title">Sign PDF</Typography>
        <p className="uploader-subtitle">Add a text signature to the last page of your PDF document in elegant italic style.</p>

        <TextField
          label="Your Signature"
          value={signText}
          onChange={e => setSignText(e.target.value)}
          fullWidth className="styled-input"
          placeholder="e.g. John Smith"
          sx={{ mb: 3 }}
        />

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">✍️</span>
          {isDragActive ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">Signature will be placed on the last page</p>
        </div>

        {file && (
          <>
            <div className="selected-file-chip">
              <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
              <Typography className="selected-file-name">{file.name}</Typography>
            </div>
            <div className="uploader-divider" />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {POSITIONS.map(p => (
                <button key={p.value} onClick={() => setPosition(p.value)} style={{
                  padding: '8px 16px', borderRadius: 8, border: `2px solid ${position === p.value ? '#4f46e5' : '#e2e8f0'}`,
                  background: position === p.value ? '#e0e7ff' : '#f8fafc', fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem', fontWeight: 600, color: position === p.value ? '#4f46e5' : '#475569',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>{p.label}</button>
              ))}
            </div>
          </>
        )}

        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{error}</Alert>}
        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleSign} disabled={!file || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignPdfUploader;
