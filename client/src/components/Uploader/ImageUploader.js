// client/src/Uploader/ImageUploader.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Single file state
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setSelectedFile(file);
      setErrorMessage('');
    } else {
      setErrorMessage('No file selected.');
    }
  };

  const convertImageToPdf = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select an image file.');
      return;
    }

    const pdfDoc = await PDFDocument.create();
    const fileType = selectedFile.type.split('/')[1].toUpperCase();
    const arrayBuffer = await selectedFile.arrayBuffer();

    let image;
    if (fileType === 'JPEG' || fileType === 'JPG') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else {
      image = await pdfDoc.embedPng(arrayBuffer);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `${selectedFile.name.split('.').slice(0, -1).join('.')}.pdf`); // Use original file name

    setSelectedFile(null); // Reset file selection
  };

  const handleConvert = async () => {
    setLoading(true);
    try {
      await convertImageToPdf();
    //   alert("Image successfully converted to PDF!");
    } catch (error) {
      console.error('Error converting image:', error);
      setErrorMessage('Error converting image to PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false, // Only allow a single file
  });

  return (
    <Container maxWidth="md" sx={{ marginTop: '100px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your Image to Convert to PDF
      </Typography>

      <Box {...getRootProps()} sx={{
        border: '2px dashed #3f51b5',
        padding: '40px',
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: isDragActive ? '#e3f2fd' : '#f5f5f5',
        marginBottom: '20px',
        transition: 'background-color 0.3s ease',
      }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the file here ...</Typography>
        ) : (
          <Typography>Drag and drop your image here, or click to select the file</Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" component="label">
          Select File
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
        </Button>

        {selectedFile && (
          <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic', color: 'green' }}>
            {selectedFile.name} selected
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
          onClick={handleConvert}
          disabled={!selectedFile || loading}
          sx={{ width: '80px', mr: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Convert'}
        </Button>
        <Button variant="outlined" onClick={() => setSelectedFile(null)} sx={{ width: '80px' }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default ImageUploader;
