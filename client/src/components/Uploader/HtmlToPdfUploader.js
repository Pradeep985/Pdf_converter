import React, { useState } from 'react';
import { Typography, Button, CircularProgress, Alert, TextField } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import './UploaderPage.css';

const HtmlToPdfUploader = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = () => {
    if (!htmlCode.trim()) return;
    setLoading(true);
    
    // Create a new window to render and print the HTML
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to use this feature.");
      setLoading(false);
      return;
    }
    
    printWindow.document.write(htmlCode);
    printWindow.document.close();
    
    // Trigger print dialog when loaded
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      setLoading(false);
    };
    
    // Fallback if onload doesn't fire
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="uploader-page">
      <div className="uploader-card" style={{ maxWidth: '800px' }}>
        <div className="uploader-icon-wrap"><LanguageIcon /></div>
        <Typography className="uploader-title">HTML to PDF</Typography>
        <p className="uploader-subtitle">Paste your HTML code below. When you click convert, a print dialog will open allowing you to save the rendered page as a PDF.</p>

        <TextField
          multiline
          rows={12}
          variant="outlined"
          fullWidth
          placeholder="<h1>Hello World</h1><p>Paste your HTML here...</p>"
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          sx={{ mb: 3, fontFamily: 'monospace' }}
          className="styled-input"
        />

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setHtmlCode('')}>Clear</Button>
          <Button className="btn-primary" onClick={handleConvert} disabled={!htmlCode.trim() || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Convert to PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HtmlToPdfUploader;
