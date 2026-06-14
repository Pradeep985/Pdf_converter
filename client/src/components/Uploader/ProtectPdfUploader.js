import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, TextField } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import LockIcon from '@mui/icons-material/Lock';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const ProtectPdfUploader = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProtect = async () => {
    if (!file) return;
    if (!password) { setError('Please enter a password.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const out = await doc.save({
        userPassword: password,
        ownerPassword: password + '_owner',
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: true,
          documentAssembly: false,
        },
      });
      saveAs(new Blob([out], { type: 'application/pdf' }), `protected_${file.name}`);
      setFile(null); setPassword(''); setConfirmPassword('');
    } catch {
      setError('Failed to protect the PDF. Please try again.');
    } finally { setLoading(false); }
  };

  const onDrop = useCallback((accepted) => { if (accepted[0]) { setFile(accepted[0]); setError(''); } }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><LockIcon /></div>
        <Typography className="uploader-title">Protect PDF</Typography>
        <p className="uploader-subtitle">Add a password to your PDF to prevent unauthorized access. All encryption happens in your browser.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">🔐</span>
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
            <TextField label="New Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth className="styled-input" sx={{ mb: 2 }} />
            <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} fullWidth className="styled-input" />
          </>
        )}

        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{error}</Alert>}
        <div className="action-row">
          <Button className="btn-secondary" onClick={() => { setFile(null); setPassword(''); setConfirmPassword(''); }}>Clear</Button>
          <Button className="btn-primary" onClick={handleProtect} disabled={!file || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Protect PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProtectPdfUploader;
