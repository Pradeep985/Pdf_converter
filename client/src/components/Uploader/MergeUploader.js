import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';

const MAX_FILES = 5;

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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedFiles(items);
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf',
    multiple: true,
  });

  return (
    <Container maxWidth="md" sx={{
      marginTop: '80px',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: 3,
    }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Upload Your PDF Files to Merge
      </Typography>

      {/* Dropzone Area */}
      <Box {...getRootProps()} sx={{
        border: '2px dashed #3f51b5',
        padding: '40px',
        cursor: 'pointer',
        borderRadius: '10px',
        backgroundColor: isDragActive ? '#e3f2fd' : '#f5f5f5',
        marginBottom: '20px',
        transition: 'background-color 0.3s ease',
        textAlign: 'center',
        '&:hover': {
          backgroundColor: '#e1f5fe',
        },
      }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>Drop the files here ...</Typography>
        ) : (
          <Typography variant="body1" sx={{ color: '#616161' }}>Drag and drop your PDF files here, or click to select files</Typography>
        )}
      </Box>

      {/* File List and Dragging */}
      {selectedFiles.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps} sx={{
                marginBottom: '20px',
                backgroundColor: '#ffffff',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: 1,
              }}>
                {selectedFiles.map((file, index) => (
                  <Draggable key={file.name} draggableId={file.name} index={index}>
                    {(provided) => (
                      <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginBottom: '5px',
                        backgroundColor: '#fafafa',
                        boxShadow: 1,
                      }}>
                        <Typography variant="body2" sx={{ flexGrow: 1, fontSize: '14px', color: '#333' }}>
                          {file.name}
                        </Typography>
                        <Box>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              const updatedFiles = selectedFiles.filter((_, i) => i !== index);
                              setSelectedFiles(updatedFiles);
                            }}
                            sx={{ marginRight: '5px', borderColor: '#f44336', color: '#f44336' }}
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
                            sx={{ marginRight: '5px', borderColor: '#3f51b5', color: '#3f51b5' }}
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
                            sx={{ borderColor: '#3f51b5', color: '#3f51b5' }}
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

      {/* Select File Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" component="label" sx={{
          backgroundColor: '#3f51b5', 
          color: 'white', 
          '&:hover': { backgroundColor: '#303f9f' }
        }}>
          Select Files
          <input type="file" hidden onChange={handleFileChange} accept=".pdf" multiple />
        </Button>

        {selectedFiles.length > 0 && (
          <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic', color: 'green' }}>
            {selectedFiles.length} file(s) selected
          </Typography>
        )}
      </Box>

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMerge}
          disabled={selectedFiles.length < 2 || loading}
          sx={{
            width: '100px',
            padding: '10px',
            backgroundColor: '#3f51b5',
            '&:hover': { backgroundColor: '#303f9f' },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Merge'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setSelectedFiles([])}
          sx={{
            width: '100px',
            padding: '10px',
            color: '#3f51b5',
            borderColor: '#3f51b5',
            '&:hover': { borderColor: '#303f9f', color: '#303f9f' },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default MergeUploader;
