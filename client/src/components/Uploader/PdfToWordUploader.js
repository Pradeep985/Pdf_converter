import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const PdfToWordUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('pdfFile', file);
    try {
      const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:5000')/api/pdf-to-word', formData, { responseType: 'blob' });
      saveAs(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), `${file.name.replace(/\.[^/.]+$/, '')}.docx`);
      setFile(null);
    } catch {
      setError('Conversion failed. Please try again.');
    } finally { setLoading(false); }
  };

  const onDrop = useCallback((accepted) => { if (accepted[0]) { setFile(accepted[0]); setError(''); } }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><DescriptionIcon /></div>
        <Typography className="uploader-title">PDF to Word</Typography>
        <p className="uploader-subtitle">Convert your PDF into an editable Word document.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">📝</span>
          {isDragActive ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">PDF only</p>
        </div>

        {file && (
          <div className="selected-file-chip">
            <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
            <Typography className="selected-file-name">{file.name}</Typography>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        )}

        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{error}</Alert>}
        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleConvert} disabled={!file || loading}>
            {loading ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1 }} /> Converting...</> : 'Convert to Word'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PdfToWordUploader;
