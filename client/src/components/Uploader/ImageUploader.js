import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `${selectedFile.name.split('.').slice(0, -1).join('.')}.pdf`);

    setSelectedFile(null); // Reset file selection
  };

  const handleConvert = async () => {
    setLoading(true);
    try {
      await convertImageToPdf();
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
    multiple: false,
  });

  return (
    <Container maxWidth="md" sx={{
      marginTop: '100px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: 3,
      '@media (max-width: 600px)': { padding: '15px', marginTop: '60px' },
    }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
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
        textAlign: 'center',
        '&:hover': { backgroundColor: '#e1f5fe' },
      }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
            Drop the file here ...
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ color: '#616161' }}>
            Drag and drop your image here, or click to select the file
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" component="label" sx={{
          backgroundColor: '#3f51b5',
          color: 'white',
          '&:hover': { backgroundColor: '#303f9f' },
        }}>
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
          sx={{
            width: '100px',
            padding: '10px',
            backgroundColor: '#3f51b5',
            '&:hover': { backgroundColor: '#303f9f' },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Convert'}
        </Button>

        <Button
          variant="outlined"
          onClick={() => setSelectedFile(null)}
          sx={{
            width: '100px',
            padding: '10px',
            color: '#3f51b5',
            borderColor: '#3f51b5',
            '&:hover': { borderColor: '#303f9f', color: '#303f9f' },
            marginLeft: '10px',
          }}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default ImageUploader;
