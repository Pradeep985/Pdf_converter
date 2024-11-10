// client/src/Uploader/PptUploader.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';

const PptUploader = () => {
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
    formData.append('pptFile', file); // Backend key for PowerPoint file

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/powerpoint-to-pdf/ppt-to-pdf', formData, {
        responseType: 'blob',
      });

      // Create a Blob from the response and download it as a PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `${file.name.split('.').slice(0, -1).join('.')}.pdf`);

      // Clear file after conversion
      setFile(null);
      setFileName('');
    } catch (error) {
      console.error('Error during file conversion:', error);
      alert('Failed to convert the file.');
    } finally {
      setLoading(false);
    }
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.ppt,.pptx' });

  return (
    <Container maxWidth="md" sx={{ marginTop: '100px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your PowerPoint to Convert to PDF
      </Typography>

      {/* Advertisement space */}
      <Box sx={{ backgroundColor: '#e0f7fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="primary">Sponsored Ad Space</Typography>
        <Typography variant="body2">Check out our latest offers!</Typography>
      </Box>

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
          <Typography>Drop the files here ...</Typography>
        ) : (
          <Typography>
            Drag and drop a file here, or click to select a file
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" component="label">
          Select File
          <input type="file" hidden onChange={handleFileChange} accept=".ppt,.pptx" />
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
          sx={{ width: '80px', mr: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Convert'}
        </Button>
        <Button variant="outlined" onClick={() => setFile(null)} sx={{ width: '80px' }}>
          Cancel
        </Button>
      </Box>

      {/* Another advertisement space */}
      <Box sx={{ backgroundColor: '#e0f7fa', padding: '20px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="primary">Another Ad Space</Typography>
        <Typography variant="body2">Boost your productivity with our tools!</Typography>
      </Box>
    </Container>
  );
};

export default PptUploader;
