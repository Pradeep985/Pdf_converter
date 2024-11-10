import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete'; // Importing delete icon
import MoveUpIcon from '@mui/icons-material/MoveUp'; // Importing move up icon
import MoveDownIcon from '@mui/icons-material/MoveDown'; // Importing move down icon

const MAX_FILES = 5; // Maximum number of PDFs to upload

const MergeUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > MAX_FILES) {
      setErrorMessage(`You can only select up to ${MAX_FILES} PDF files.`);
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files);
      setErrorMessage('');
    }
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
      console.error('Error merging PDFs:', error);
      setErrorMessage('Error merging PDFs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list
    const items = Array.from(selectedFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedFiles(items);
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf',
    multiple: true,
  });

  return (
    <Container maxWidth="md" sx={{ marginTop: '100px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your PDF Files to Merge
      </Typography>

      <Box {...getRootProps()} sx={{
        border: '2px dashed #3f51b5',
        padding: '40px',
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: isDragActive ? '#e3f2fd' : '#f5f5f5',
        marginBottom: '20px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#e1f5fe',
        },
      }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1" align="center">Drop the files here ...</Typography>
        ) : (
          <Typography variant="body1" align="center">Drag and drop your PDF files here, or click to select files</Typography>
        )}
      </Box>

      {selectedFiles.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ marginBottom: '20px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: 1 }}>
                {selectedFiles.map((file, index) => (
                  <Draggable key={file.name} draggableId={file.name} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          marginBottom: '5px',
                          backgroundColor: '#fafafa',
                          boxShadow: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>{file.name}</Typography>
                        <Box>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              const updatedFiles = selectedFiles.filter((_, i) => i !== index);
                              setSelectedFiles(updatedFiles);
                            }}
                            sx={{ marginRight: '5px' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              if (index > 0) {
                                const updatedFiles = [...selectedFiles];
                                [updatedFiles[index - 1], updatedFiles[index]] = [updatedFiles[index], updatedFiles[index - 1]];
                                setSelectedFiles(updatedFiles);
                              }
                            }}
                            disabled={index === 0}
                            sx={{ marginRight: '5px' }}
                          >
                            <MoveUpIcon fontSize="small" />
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              if (index < selectedFiles.length - 1) {
                                const updatedFiles = [...selectedFiles];
                                [updatedFiles[index + 1], updatedFiles[index]] = [updatedFiles[index], updatedFiles[index + 1]];
                                setSelectedFiles(updatedFiles);
                              }
                            }}
                            disabled={index === selectedFiles.length - 1}
                          >
                            <MoveDownIcon fontSize="small" />
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" component="label" sx={{ marginRight: '10px' }}>
          Select Files
          <input type="file" hidden onChange={handleFileChange} accept=".pdf" multiple />
        </Button>

        {selectedFiles.length > 0 && (
          <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic', color: 'green' }}>
            {selectedFiles.length} file(s) selected
          </Typography>
        )}
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMerge}
          disabled={selectedFiles.length < 2 || loading}
          sx={{ width: '80px', mr: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Merge'}
        </Button>
        <Button variant="outlined" onClick={() => setSelectedFiles([])} sx={{ width: '80px' }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default MergeUploader;
