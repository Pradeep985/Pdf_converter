import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import PinIcon from '@mui/icons-material/Pin';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const AddPageNumbersUploader = () => {
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState('bottom-center');
  const [startNumber, setStartNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();
      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const text = `${startNumber + i}`;
        const fontSize = 11;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        let x, y;
        const margin = 24;
        if (position === 'bottom-center') { x = (width - textWidth) / 2; y = margin; }
        else if (position === 'bottom-right') { x = width - textWidth - margin; y = margin; }
        else if (position === 'bottom-left') { x = margin; y = margin; }
        else if (position === 'top-center') { x = (width - textWidth) / 2; y = height - margin - fontSize; }
        else if (position === 'top-right') { x = width - textWidth - margin; y = height - margin - fontSize; }
        else { x = margin; y = height - margin - fontSize; }
        page.drawText(text, { x, y, size: fontSize, font, color: rgb(0.2, 0.2, 0.2) });
      });
      const out = await doc.save();
      saveAs(new Blob([out], { type: 'application/pdf' }), `numbered_${file.name}`);
      setFile(null);
    } catch {
      setError('Failed to add page numbers. Please try again.');
    } finally { setLoading(false); }
  };

  const onDrop = useCallback((accepted) => { if (accepted[0]) { setFile(accepted[0]); setError(''); } }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><PinIcon /></div>
        <Typography className="uploader-title">Add Page Numbers</Typography>
        <p className="uploader-subtitle">Automatically stamp page numbers onto every page of your PDF.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">🔢</span>
          {isDragActive ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">PDF only</p>
        </div>

        {file && (
          <>
            <div className="selected-file-chip">
              <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
              <Typography className="selected-file-name">{file.name}</Typography>
            </div>
            <div className="uploader-divider" />
            <FormControl fullWidth className="styled-input" sx={{ mb: 2 }}>
              <InputLabel>Position</InputLabel>
              <Select value={position} label="Position" onChange={e => setPosition(e.target.value)}>
                <MenuItem value="bottom-center">Bottom Center</MenuItem>
                <MenuItem value="bottom-right">Bottom Right</MenuItem>
                <MenuItem value="bottom-left">Bottom Left</MenuItem>
                <MenuItem value="top-center">Top Center</MenuItem>
                <MenuItem value="top-right">Top Right</MenuItem>
                <MenuItem value="top-left">Top Left</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Start from page number" type="number" value={startNumber} onChange={e => setStartNumber(Math.max(1, +e.target.value))} fullWidth className="styled-input" />
          </>
        )}

        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{error}</Alert>}
        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleAdd} disabled={!file || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Add Numbers'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPageNumbersUploader;
