import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';

const WordUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('wordFile', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/word/word-to-pdf', formData, {
        responseType: 'blob',
      });

      // Create a Blob from the response and download it as a PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `${file.name.split('.').slice(0, -1).join('.')}.pdf`);

      // Clear the file selection after conversion
      setFile(null);
      setFileName('');
    } catch (error) {
      console.error('Error during file conversion:', error);
      alert("Failed to convert the file.");
    } finally {
      setLoading(false);
    }
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.doc,.docx' });

  return (
    <Container maxWidth="md" sx={{
      marginTop: '50px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: 3,
      '@media (max-width: 600px)': { padding: '15px', marginTop: '40px' },
    }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Upload Your Word Document to Convert to PDF
      </Typography>

      {/* Advertisement space */}
      <Box sx={{
        backgroundColor: '#e0f7fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        boxShadow: 1,
      }}>
        <Typography variant="h6" color="primary">Sponsored Ad Space</Typography>
        <Typography variant="body2" sx={{ color: '#616161' }}>Check out our latest offers!</Typography>
      </Box>

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
            Drag and drop a file here, or click to select a file
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
          <input type="file" hidden onChange={handleFileChange} accept=".doc,.docx" />
        </Button>

        {file && (
          <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic', color: 'green' }}>
            {fileName}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          disabled={!file || loading}
          sx={{
            width: '100px',
            padding: '10px',
            backgroundColor: '#3f51b5',
            '&:hover': { backgroundColor: '#303f9f' },
            marginRight: '10px',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Convert'}
        </Button>

        <Button
          variant="outlined"
          onClick={() => setFile(null)}
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

      {/* Another advertisement space */}
      <Box sx={{
        backgroundColor: '#e0f7fa',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px',
        textAlign: 'center',
        boxShadow: 1,
      }}>
        <Typography variant="h6" color="primary">Another Ad Space</Typography>
        <Typography variant="body2" sx={{ color: '#616161' }}>Boost your productivity with our tools!</Typography>
      </Box>
    </Container>
  );
};

export default WordUploader;
