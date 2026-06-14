import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, TextField, MenuItem } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const SplitUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [splitMode, setSplitMode] = useState('splitByRange');
  const [rangeMode, setRangeMode] = useState('custom');
  const [customRanges, setCustomRanges] = useState([{ from: 1, to: 1 }]);
  const [fixedRangeCount, setFixedRangeCount] = useState(2);
  const [pagesToExtract, setPagesToExtract] = useState('');
  const [error, setError] = useState('');

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const pdfData = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(new Uint8Array(pdfData));
      const totalPages = pdfDoc.getPageCount();

      const downloadPdf = async (newDoc, filename) => {
        const bytes = await newDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
      };

      if (splitMode === 'splitByRange') {
        const ranges = rangeMode === 'custom' ? customRanges : (() => {
          const r = [];
          for (let i = 0; i < totalPages; i += fixedRangeCount)
            r.push({ from: i + 1, to: Math.min(i + fixedRangeCount, totalPages) });
          return r;
        })();
        for (const { from, to } of ranges) {
          const newDoc = await PDFDocument.create();
          for (let i = from - 1; i < to && i < totalPages; i++) {
            const [p] = await newDoc.copyPages(pdfDoc, [i]);
            newDoc.addPage(p);
          }
          await downloadPdf(newDoc, `split_pages_${from}-${to}.pdf`);
        }
      } else {
        const pages = pagesToExtract.split(',').map(p => parseInt(p.trim(), 10) - 1).filter(i => i >= 0 && i < totalPages);
        const newDoc = await PDFDocument.create();
        for (const i of pages) { const [p] = await newDoc.copyPages(pdfDoc, [i]); newDoc.addPage(p); }
        await downloadPdf(newDoc, 'extracted_pages.pdf');
      }
      setFile(null);
    } catch (e) {
      setError('Failed to split PDF. Please ensure the file is a valid PDF.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((accepted) => { if (accepted[0]) { setFile(accepted[0]); setError(''); } }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><CallSplitIcon /></div>
        <Typography className="uploader-title">Split PDF</Typography>
        <p className="uploader-subtitle">Split a PDF into multiple files. Choose by page range or extract specific pages.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">✂️</span>
          {isDragActive
            ? <Typography className="drop-zone-text-active">Release to upload</Typography>
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

        {file && (
          <>
            <div className="uploader-divider" />
            <TextField select label="Mode" value={splitMode} onChange={e => setSplitMode(e.target.value)} fullWidth className="styled-input" sx={{ mb: 2 }}>
              <MenuItem value="splitByRange">Split by Range</MenuItem>
              <MenuItem value="extractPages">Extract Pages</MenuItem>
            </TextField>

            {splitMode === 'splitByRange' && (
              <>
                <TextField select label="Range Type" value={rangeMode} onChange={e => setRangeMode(e.target.value)} fullWidth className="styled-input" sx={{ mb: 2 }}>
                  <MenuItem value="custom">Custom Ranges</MenuItem>
                  <MenuItem value="fixed">Fixed Interval</MenuItem>
                </TextField>

                {rangeMode === 'custom' ? (
                  <>
                    {customRanges.map((range, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                        <TextField label="From" type="number" value={range.from} onChange={e => { const r = [...customRanges]; r[i].from = +e.target.value; setCustomRanges(r); }} fullWidth className="styled-input" />
                        <TextField label="To" type="number" value={range.to} onChange={e => { const r = [...customRanges]; r[i].to = +e.target.value; setCustomRanges(r); }} fullWidth className="styled-input" />
                      </div>
                    ))}
                    <Button onClick={() => setCustomRanges([...customRanges, { from: 1, to: 1 }])} sx={{ mb: 2, textTransform: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#4f46e5' }}>+ Add Range</Button>
                  </>
                ) : (
                  <TextField label="Pages per split" type="number" value={fixedRangeCount} onChange={e => setFixedRangeCount(+e.target.value)} fullWidth className="styled-input" sx={{ mb: 2 }} />
                )}
              </>
            )}

            {splitMode === 'extractPages' && (
              <TextField label="Pages to extract (e.g. 1, 3, 5)" value={pagesToExtract} onChange={e => setPagesToExtract(e.target.value)} fullWidth className="styled-input" sx={{ mb: 2 }} />
            )}
          </>
        )}

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>}

        <div className="action-row">
          <Button className="btn-secondary" onClick={() => setFile(null)}>Clear</Button>
          <Button className="btn-primary" onClick={handleSplit} disabled={!file || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Split PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplitUploader;
