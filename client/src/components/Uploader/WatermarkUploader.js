import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, TextField } from '@mui/material';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import BrushIcon from '@mui/icons-material/Brush';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const WatermarkUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');

  const handleWatermark = async () => {
    if (!selectedFile) { setErrorMessage('Please select a PDF file.'); return; }
    if (!watermarkText.trim()) { setErrorMessage('Please enter watermark text.'); return; }
    setLoading(true);
    try {
      const pdfBytes = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textSize = watermarkText.length > 20 ? 38 : 56;
        page.drawText(watermarkText, {
          x: width / 2 - (watermarkText.length * (textSize / 4)),
          y: height / 2,
          size: textSize,
          font,
          color: rgb(0.31, 0.27, 0.90),
          opacity: 0.25,
          rotate: degrees(45),
        });
      });
      const bytes = await pdfDoc.save();
      saveAs(new Blob([bytes], { type: 'application/pdf' }), `watermarked_${selectedFile.name}`);
      setSelectedFile(null);
    } catch (error) {
      setErrorMessage('Error adding watermark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) { setSelectedFile(accepted[0]); setErrorMessage(''); }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><BrushIcon /></div>
        <Typography className="uploader-title">Watermark PDF</Typography>
        <p className="uploader-subtitle">Stamp custom text onto every page of your PDF document.</p>

        <TextField
          label="Watermark Text"
          variant="outlined"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          fullWidth
          className="styled-input"
          placeholder="e.g. CONFIDENTIAL, DRAFT, Company Name..."
          sx={{ mb: 3 }}
        />

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">💧</span>
          {isDragActive
            ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">PDF only</p>
        </div>

        {selectedFile && (
          <div className="selected-file-chip">
            <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
            <Typography className="selected-file-name">{selectedFile.name}</Typography>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{(selectedFile.size / 1024).toFixed(0)} KB</span>
          </div>
        )}

        {errorMessage && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{errorMessage}</Alert>}

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setSelectedFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleWatermark} disabled={!selectedFile || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Stamp Watermark'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WatermarkUploader;
