import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './UploaderPage.css';

const OrganizePdfUploader = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]); // [{index: 0, label: 'Page 1'}, ...]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadFile = async (f) => {
    setFile(f); setError('');
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const count = doc.getPageCount();
      setPages(Array.from({ length: count }, (_, i) => ({ id: `page-${i}`, originalIndex: i, label: `Page ${i + 1}` })));
    } catch {
      setError('Could not read the PDF.');
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(pages);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setPages(reordered);
  };

  const handleOrganize = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      for (const page of pages) {
        const [copied] = await newDoc.copyPages(srcDoc, [page.originalIndex]);
        newDoc.addPage(copied);
      }
      const out = await newDoc.save();
      saveAs(new Blob([out], { type: 'application/pdf' }), `organized_${file.name}`);
      setFile(null); setPages([]);
    } catch {
      setError('Failed to organize PDF. Please try again.');
    } finally { setLoading(false); }
  };

  const onDrop = useCallback(async (accepted) => { if (accepted[0]) await loadFile(accepted[0]); }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><DashboardCustomizeIcon /></div>
        <Typography className="uploader-title">Organize PDF</Typography>
        <p className="uploader-subtitle">Reorder the pages of your PDF by dragging them into the order you want.</p>

        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">📋</span>
          {isDragActive ? <Typography className="drop-zone-text-active">Release to upload</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop a PDF, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>}
          <p className="drop-zone-hint">PDF only</p>
        </div>

        {file && pages.length > 0 && (
          <>
            <div className="selected-file-chip">
              <PictureAsPdfIcon sx={{ color: '#4f46e5' }} />
              <Typography className="selected-file-name">{file.name}</Typography>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{pages.length} pages</span>
            </div>
            <div className="uploader-divider" />
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#0f172a', fontSize: '0.95rem', marginBottom: 12 }}>Drag pages to reorder:</p>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="organize-list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ marginBottom: 24 }}>
                    {pages.map((page, index) => (
                      <Draggable key={page.id} draggableId={page.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                            marginBottom: 8, borderRadius: 10, border: '1px solid',
                            borderColor: snapshot.isDragging ? '#c7d2fe' : '#e2e8f0',
                            background: snapshot.isDragging ? '#f0f4ff' : '#f8fafc',
                            cursor: 'grab', ...provided.draggableProps.style,
                          }}>
                            <span {...provided.dragHandleProps} style={{ color: '#94a3b8', display: 'flex' }}><DragIndicatorIcon fontSize="small" /></span>
                            <span style={{ width: 28, height: 28, borderRadius: 8, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', fontFamily: 'Inter, sans-serif' }}>{index + 1}</span>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: '#0f172a' }}>{page.label}</span>
                            {index !== page.originalIndex && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>moved</span>}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>}
        <div className="action-row">
          <Button className="btn-secondary" onClick={() => { setFile(null); setPages([]); }}>Clear</Button>
          <Button className="btn-primary" onClick={handleOrganize} disabled={!file || loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Save Order'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizePdfUploader;
