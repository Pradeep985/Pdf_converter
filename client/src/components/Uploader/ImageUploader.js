import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import ImageIcon from '@mui/icons-material/Image';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import './UploaderPage.css';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleConvert = async () => {
    if (!selectedFile) { setErrorMessage('Please select an image file.'); return; }
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const arrayBuffer = await selectedFile.arrayBuffer();
      const fileType = selectedFile.type;
      const image = fileType === 'image/jpeg' || fileType === 'image/jpg'
        ? await pdfDoc.embedJpg(arrayBuffer)
        : await pdfDoc.embedPng(arrayBuffer);

      // Fit image to A4 size (595 x 842 pt) with padding
      const maxW = 560, maxH = 800;
      const scale = Math.min(maxW / image.width, maxH / image.height);
      const w = image.width * scale, h = image.height * scale;
      const page = pdfDoc.addPage([595, 842]);
      page.drawImage(image, { x: (595 - w) / 2, y: (842 - h) / 2, width: w, height: h });

      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${selectedFile.name.split('.').slice(0, -1).join('.')}.pdf`);
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      setErrorMessage('Error converting image. Only JPEG and PNG formats are supported.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) {
      setSelectedFile(accepted[0]);
      setErrorMessage('');
      setPreview(URL.createObjectURL(accepted[0]));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    multiple: false,
  });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><ImageIcon /></div>
        <Typography className="uploader-title">Image to PDF</Typography>
        <p className="uploader-subtitle">Convert JPG or PNG images to a perfectly-formatted PDF document, centered on an A4 page.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {preview
            ? <img src={preview} alt="preview" style={{ maxHeight: 140, maxWidth: '100%', borderRadius: 8, objectFit: 'contain' }} />
            : <>
                <span className="drop-zone-icon">🖼️</span>
                {isDragActive
                  ? <Typography className="drop-zone-text-active">Release to upload</Typography>
                  : <Typography className="drop-zone-text">Drag &amp; drop an image, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
                <p className="drop-zone-hint">JPG and PNG supported</p>
              </>
          }
        </div>

        {selectedFile && (
          <div className="selected-file-chip">
            <InsertPhotoIcon sx={{ color: '#4f46e5' }} />
            <Typography className="selected-file-name">{selectedFile.name}</Typography>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{(selectedFile.size / 1024).toFixed(0)} KB</span>
          </div>
        )}

        {errorMessage && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{errorMessage}</Alert>}

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => { setSelectedFile(null); setPreview(null); }}>Clear</Button>
          <Button className="btn-primary" onClick={handleConvert} disabled={!selectedFile || loading}>
            {loading ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1 }} /> Converting...</> : 'Convert to PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
