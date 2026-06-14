import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, Checkbox } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const RemovePagesUploader = () => {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadFile = async (f) => {
    setFile(f);
    setError('');
    setSelectedPages(new Set());
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setTotalPages(doc.getPageCount());
    } catch {
      setError('Could not read the PDF. Please try another file.');
    }
  };

  const togglePage = (pageNum) => {
    setSelectedPages(prev => {
      const next = new Set(prev);
      next.has(pageNum) ? next.delete(pageNum) : next.add(pageNum);
      return next;
    });
  };

  const handleRemove = async () => {
    if (!file || selectedPages.size === 0) return;
    if (selectedPages.size >= totalPages) { setError('You cannot remove all pages.'); return; }
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      // Remove in reverse order so indices stay valid
      const pagesToRemove = [...selectedPages].map(p => p - 1).sort((a, b) => b - a);
      pagesToRemove.forEach(i => doc.removePage(i));
      const out = await doc.save();
      saveAs(new Blob([out], { type: 'application/pdf' }), `removed_pages_${file.name}`);
      setFile(null); setTotalPages(0); setSelectedPages(new Set());
    } catch {
      setError('Failed to remove pages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (accepted) => {
    if (accepted[0]) await loadFile(accepted[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><DeleteSweepIcon /></div>
        <Typography className="uploader-title">Remove Pages</Typography>
        <p className="uploader-subtitle">Select the pages you want to delete from your PDF and download the cleaned version.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">🗑️</span>
          {isDragActive ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">PDF only</p>
        </div>

        {file && totalPages > 0 && (
          <>
            <div className="selected-file-chip">
              <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
              <Typography className="selected-file-name">{file.name}</Typography>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{totalPages} pages</span>
            </div>

            <div className="uploader-divider" />
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#0f172a', fontSize: '0.95rem', marginBottom: 12 }}>
              Select pages to remove ({selectedPages.size} selected):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 8, marginBottom: 24 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <div
                  key={pageNum}
                  onClick={() => togglePage(pageNum)}
                  style={{
                    border: `2px solid ${selectedPages.has(pageNum) ? '#ef4444' : '#e2e8f0'}`,
                    borderRadius: 10,
                    padding: '10px 4px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: selectedPages.has(pageNum) ? '#fef2f2' : '#f8fafc',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: selectedPages.has(pageNum) ? '#ef4444' : '#475569',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {selectedPages.has(pageNum) ? '✕' : `P${pageNum}`}
                </div>
              ))}
            </div>
          </>
        )}

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>}

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => { setFile(null); setTotalPages(0); setSelectedPages(new Set()); }}>Clear</Button>
          <Button
            className="btn-primary"
            onClick={handleRemove}
            disabled={!file || selectedPages.size === 0 || loading}
            sx={{ backgroundColor: '#ef4444 !important', '&:hover': { backgroundColor: '#dc2626 !important' } }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : `Remove ${selectedPages.size > 0 ? selectedPages.size : ''} Page${selectedPages.size !== 1 ? 's' : ''}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RemovePagesUploader;
