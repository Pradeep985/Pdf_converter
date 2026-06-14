import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PDFDocument, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const RotateUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(90);

  const handleRotate = async () => {
    if (!selectedFile) { setErrorMessage('Please select a PDF file.'); return; }
    setLoading(true);
    try {
      const pdfBytes = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.getPages().forEach((page) => {
        page.setRotation(degrees(page.getRotation().angle + rotationAngle));
      });
      const modifiedPdfBytes = await pdfDoc.save();
      saveAs(new Blob([modifiedPdfBytes], { type: 'application/pdf' }), `rotated_${selectedFile.name}`);
      setSelectedFile(null);
    } catch (error) {
      setErrorMessage('Error rotating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) { setSelectedFile(accepted[0]); setErrorMessage(''); }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  const rotationOptions = [
    { value: 90, label: '90° Clockwise' },
    { value: -90, label: '90° Counter-Clockwise' },
    { value: 180, label: '180° Flip' },
  ];

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><RotateRightIcon /></div>
        <Typography className="uploader-title">Rotate PDF</Typography>
        <p className="uploader-subtitle">Rotate all pages of a PDF in any direction with one click.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">🔄</span>
          {isDragActive
            ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">PDF only</p>
        </div>

        {selectedFile && (
          <>
            <div className="selected-file-chip">
              <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
              <Typography className="selected-file-name">{selectedFile.name}</Typography>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{(selectedFile.size / 1024).toFixed(0)} KB</span>
            </div>

            <div className="uploader-divider" />

            <FormControl fullWidth className="styled-input">
              <InputLabel>Rotation Direction</InputLabel>
              <Select value={rotationAngle} label="Rotation Direction" onChange={(e) => setRotationAngle(e.target.value)}>
                {rotationOptions.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </Select>
            </FormControl>
          </>
        )}

        {errorMessage && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{errorMessage}</Alert>}

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setSelectedFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleRotate} disabled={!selectedFile || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Rotate PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RotateUploader;
