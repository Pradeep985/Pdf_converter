import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, TextField } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const UnlockUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleUnlock = async () => {
    if (!selectedFile) { setErrorMessage('Please select a PDF file.'); return; }
    if (!password) { setErrorMessage('Please enter the PDF password.'); return; }
    setLoading(true);
    try {
      const pdfBytes = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes, { password });
      const unlockedBytes = await pdfDoc.save();
      saveAs(new Blob([unlockedBytes], { type: 'application/pdf' }), `unlocked_${selectedFile.name}`);
      setSelectedFile(null);
      setPassword('');
    } catch (error) {
      setErrorMessage(error.message?.includes('password') ? 'Incorrect password. Please try again.' : 'Could not unlock this PDF. Check if it is password-protected.');
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
        <div className="uploader-icon-wrap"><LockOpenIcon /></div>
        <Typography className="uploader-title">Unlock PDF</Typography>
        <p className="uploader-subtitle">
          Remove password protection from a PDF. The file is decrypted entirely in your browser — your password is never sent to any server.
        </p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">🔓</span>
          {isDragActive
            ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a locked PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">Password-protected PDF</p>
        </div>

        {selectedFile && (
          <>
            <div className="selected-file-chip">
              <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
              <Typography className="selected-file-name">{selectedFile.name}</Typography>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{(selectedFile.size / 1024).toFixed(0)} KB</span>
            </div>

            <div className="uploader-divider" />

            <TextField
              label="PDF Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              className="styled-input"
              placeholder="Enter the PDF password..."
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
          </>
        )}

        {errorMessage && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{errorMessage}</Alert>}

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => { setSelectedFile(null); setPassword(''); }}>Clear</Button>
          <Button className="btn-primary" onClick={handleUnlock} disabled={!selectedFile || !password || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Unlock PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnlockUploader;
