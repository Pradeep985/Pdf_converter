import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, CircularProgress, Alert, } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './UploaderPage.css';

const MAX_FILES = 10;

const MergeUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const addFiles = (newFiles) => {
    const combined = [...selectedFiles, ...newFiles].slice(0, MAX_FILES);
    setSelectedFiles(combined);
    setErrorMessage('');
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      setErrorMessage('Please select at least 2 PDF files to merge.');
      return;
    }
    setLoading(true);
    const mergedPdf = await PDFDocument.create();
    try {
      for (const file of selectedFiles) {
        const pdfBytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
      saveAs(blob, 'merged_document.pdf');
      setSelectedFiles([]);
    } catch (error) {
      setErrorMessage('Error merging PDFs. Please make sure all files are valid PDFs.');
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedFiles);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setSelectedFiles(items);
  };

  const onDrop = useCallback((accepted) => addFiles(accepted), [addFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
  });

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <div className="uploader-icon-wrap"><MergeTypeIcon /></div>
        <Typography className="uploader-title">Merge PDF Files</Typography>
        <p className="uploader-subtitle">
          Combine multiple PDF documents into one. Drag to reorder pages before merging.
        </p>

        {/* Drop Zone */}
        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <span className="drop-zone-icon">📂</span>
          {isDragActive
            ? <Typography className="drop-zone-text-active">Release to add files</Typography>
            : <Typography className="drop-zone-text">Drag &amp; drop PDF files here, or <span style={{ color: '#4f46e5', fontWeight: 700 }}>click to browse</span></Typography>
          }
          <p className="drop-zone-hint">PDF only · Max {MAX_FILES} files</p>
        </div>

        {/* File List */}
        {selectedFiles.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="merge-list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ marginBottom: 24 }}>
                  {selectedFiles.map((file, index) => (
                    <Draggable key={`${file.name}-${index}`} draggableId={`${file.name}-${index}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 16px',
                            marginBottom: 8,
                            background: snapshot.isDragging ? '#f0f4ff' : '#f8fafc',
                            border: '1px solid',
                            borderColor: snapshot.isDragging ? '#c7d2fe' : '#e2e8f0',
                            borderRadius: 10,
                            cursor: 'grab',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <span {...provided.dragHandleProps} style={{ color: '#94a3b8', display: 'flex' }}>
                            <DragIndicatorIcon fontSize="small" />
                          </span>
                          <PictureAsPdfIcon sx={{ color: '#4f46e5', fontSize: '1.2rem' }} />
                          <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
                            {file.name}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                            {(file.size / 1024).toFixed(0)} KB
                          </span>
                          <button
                            onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 4, borderRadius: 6, transition: 'color 0.2s' }}
                            onMouseOver={e => e.currentTarget.style.color = '#ef4444'}
                            onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {errorMessage && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{errorMessage}</Alert>}

        <div className="action-row">
          {selectedFiles.length > 0 && (
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontFamily: 'Inter, sans-serif', marginRight: 'auto' }}>
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </span>
          )}
          <Button className="btn-secondary" onClick={() => setSelectedFiles([])}>Clear All</Button>
          <Button
            className="btn-primary"
            onClick={handleMerge}
            disabled={selectedFiles.length < 2 || loading}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Merge PDFs'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MergeUploader;
