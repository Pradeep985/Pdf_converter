import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';

const MAX_FILE_SIZE_MB = 10;

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const fileSizeMB = uploadedFile.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`);
        setFile(null); // Clear the selected file
        setFileName('');
      } else {
        setError(''); // Clear error message
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
      }
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('excelFile', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/excel-to-pdf', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `${fileName.replace(/\.[^/.]+$/, '')}.pdf`);

      setFile(null); // Clear file after conversion
      setFileName('');
    } catch (error) {
      console.error('Error during file conversion:', error);
      setError('Error during file conversion.');
    } finally {
      setLoading(false);
    }
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.xls,.xlsx' });

  return (
    <Container maxWidth="md" sx={{
      marginTop: '80px',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: 3,
    }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Upload Your Excel File to Convert to PDF
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
      }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography sx={{ color: '#3f51b5', fontWeight: 'bold' }}>Drop the files here ...</Typography>
        ) : (
          <Typography sx={{ color: '#616161' }}>Drag and drop an Excel file here, or click to select a file</Typography>
        )}
      </Box>

      {/* File Selection */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" component="label" sx={{
          backgroundColor: '#3f51b5', 
          color: 'white', 
          '&:hover': { backgroundColor: '#303f9f' }
        }}>
          Select File
          <input type="file" hidden onChange={handleFileChange} accept=".xls,.xlsx" />
        </Button>

        {file && (
          <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic', color: 'green' }}>
            {fileName}
          </Typography>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      {/* Convert Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          disabled={!file || loading}
          sx={{
            width: '150px',
            padding: '10px',
            backgroundColor: '#3f51b5',
            '&:hover': { backgroundColor: '#303f9f' },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Convert'}
        </Button>

        <Button
          variant="outlined"
          onClick={() => setFile(null)}
          sx={{
            width: '150px',
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

export default ExcelUploader;
