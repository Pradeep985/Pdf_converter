import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';
import TableChartIcon from '@mui/icons-material/TableChart';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './UploaderPage.css';

const MAX_FILE_SIZE_MB = 10;

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('excelFile', file);
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/excel-to-pdf`, formData, { responseType: 'blob' });
      saveAs(new Blob([response.data], { type: 'application/pdf' }), `${file.name.replace(/\.[^/.]+$/, '')}.pdf`);
      setFile(null);
    } catch (err) {
      setError('Conversion failed. Please make sure Microsoft Excel is installed (Windows) or LibreOffice (Linux).');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) {
      if (accepted[0].size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
        setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`);
      } else {
        setFile(accepted[0]);
        setError('');
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
    multiple: false,
  });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><TableChartIcon /></div>
        <Typography className="uploader-title">Excel to PDF</Typography>
        <p className="uploader-subtitle">Convert Excel spreadsheets (.xls, .xlsx) to clean PDF files. Max file size: {MAX_FILE_SIZE_MB} MB.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">📊</span>
          {isDragActive
            ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop an Excel file, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">.xls and .xlsx supported · Max {MAX_FILE_SIZE_MB} MB</p>
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

export default ExcelUploader;
