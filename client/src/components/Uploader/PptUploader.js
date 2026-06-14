import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './UploaderPage.css';

const PptUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('pptFile', file);
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/powerpoint-to-pdf/ppt-to-pdf`, formData, { responseType: 'blob' });
      saveAs(new Blob([response.data], { type: 'application/pdf' }), `${file.name.split('.').slice(0, -1).join('.')}.pdf`);
      setFile(null);
    } catch (err) {
      setError('Conversion failed. Please make sure Microsoft PowerPoint is installed (Windows) or LibreOffice (Linux).');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((accepted) => { if (accepted[0]) { setFile(accepted[0]); setError(''); } }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    multiple: false,
  });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><SlideshowIcon /></div>
        <Typography className="uploader-title">PowerPoint to PDF</Typography>
        <p className="uploader-subtitle">Convert PowerPoint presentations (.ppt, .pptx) to PDF while preserving your layouts and fonts.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">📽️</span>
          {isDragActive
            ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PowerPoint, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">.ppt and .pptx supported</p>
        </div>

        {file && (
          <div className="selected-file-chip">
            <InsertDriveFileIcon sx={{ color: '#4f46e5' }} />
            <Typography className="selected-file-name">{file.name}</Typography>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        )}

        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{error}</Alert>}

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleConvert} disabled={!file || loading}>
            {loading ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1 }} /> Converting...</> : 'Convert to PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PptUploader;
