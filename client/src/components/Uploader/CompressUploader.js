import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';
import CompressIcon from '@mui/icons-material/Compress';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const CompressUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCompress = async () => {
    if (!selectedFile) { setErrorMessage('Please select a PDF file.'); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/compress-pdf`, formData, { responseType: 'blob' });
      saveAs(new Blob([response.data], { type: 'application/pdf' }), `compressed_${selectedFile.name}`);
      setSelectedFile(null);
    } catch (error) {
      setErrorMessage('Compression failed. Ensure Ghostscript is installed on the server.');
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
        <div className="uploader-icon-wrap"><CompressIcon /></div>
        <Typography className="uploader-title">Compress PDF</Typography>
        <p className="uploader-subtitle">Reduce your PDF file size dramatically while maintaining readable quality, perfect for sharing by email or uploading online.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">📦</span>
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
          <Button className="btn-primary" onClick={handleCompress} disabled={!selectedFile || loading}>
            {loading ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1 }} /> Compressing...</> : 'Compress PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompressUploader;
