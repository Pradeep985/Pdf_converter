import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert } from '@mui/material';
import { saveAs } from 'file-saver';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import './UploaderPage.css';

// Point pdfjs to its worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToJpgUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setProgress('Loading PDF...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const totalPages = pdf.numPages;
      const zip = new JSZip();
      const imgFolder = zip.folder('images');

      for (let i = 1; i <= totalPages; i++) {
        setProgress(`Converting page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);
        const scale = 2.0; // high resolution
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.92));
        const arrayBuf = await blob.arrayBuffer();
        imgFolder.file(`page_${String(i).padStart(3, '0')}.jpg`, arrayBuf);
      }

      setProgress('Creating ZIP archive...');
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, `${file.name.replace('.pdf', '')}_images.zip`);
      setFile(null); setProgress('');
    } catch (e) {
      setError('Failed to convert PDF to images. Please try another file.');
      setProgress('');
    } finally { setLoading(false); }
  };

  const onDrop = useCallback((accepted) => { if (accepted[0]) { setFile(accepted[0]); setError(''); } }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><ImageIcon /></div>
        <Typography className="uploader-title">PDF to JPG</Typography>
        <p className="uploader-subtitle">Convert every page of your PDF into high-quality JPG images. You'll receive a ZIP file with all images.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">🖼️</span>
          {isDragActive ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">All pages will be converted at 2x resolution</p>
        </div>

        {file && (
          <div className="selected-file-chip">
            <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
            <Typography className="selected-file-name">{file.name}</Typography>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        )}

        {loading && progress && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f0f4ff', borderRadius: 10, marginTop: 16 }}>
            <CircularProgress size={18} sx={{ color: '#4f46e5' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#4f46e5', fontWeight: 500 }}>{progress}</span>
          </div>
        )}

        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{error}</Alert>}
        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleConvert} disabled={!file || loading}>
            {loading ? 'Converting...' : 'Convert to JPG'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PdfToJpgUploader;
