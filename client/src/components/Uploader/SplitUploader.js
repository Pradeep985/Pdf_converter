import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Box, Typography, Button, CircularProgress, TextField, MenuItem } from '@mui/material';
import { PDFDocument } from 'pdf-lib';

const UploaderPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [splitMode, setSplitMode] = useState('splitByRange'); // Either 'splitByRange' or 'extractPages'
  const [rangeMode, setRangeMode] = useState('custom'); // Either 'custom' or 'fixed'
  const [customRanges, setCustomRanges] = useState([{ from: 1, to: 1 }]);
  const [fixedRangeCount, setFixedRangeCount] = useState(2); // Used for fixed ranges
  const [pagesToExtract, setPagesToExtract] = useState('');

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  const handleAddRange = () => {
    setCustomRanges([...customRanges, { from: 1, to: 1 }]);
  };

  const handleSplit = async () => {
    if (!file) return;

    setLoading(true);
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const pdfData = new Uint8Array(e.target.result);
      const pdfDoc = await PDFDocument.load(pdfData);
      const totalPages = pdfDoc.getPageCount();

      if (splitMode === 'splitByRange') {
        if (rangeMode === 'custom') {
          for (let range of customRanges) {
            const { from, to } = range;
            const newPdfDoc = await PDFDocument.create();
            for (let i = from - 1; i < to; i++) {
              if (i < totalPages) {
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
                newPdfDoc.addPage(copiedPage);
              }
            }
            const pdfBytes = await newPdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `split_pages_${from}-${to}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
          }
        } else if (rangeMode === 'fixed') {
          // Fixed range splitting
          for (let i = 0; i < totalPages; i += fixedRangeCount) {
            const newPdfDoc = await PDFDocument.create();
            for (let j = i; j < i + fixedRangeCount && j < totalPages; j++) {
              const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [j]);
              newPdfDoc.addPage(copiedPage);
            }
            const pdfBytes = await newPdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `split_pages_${i + 1}-${Math.min(i + fixedRangeCount, totalPages)}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
          }
        }
      } else if (splitMode === 'extractPages') {
        // Extract pages logic
        const pages = pagesToExtract.split(',').map(p => parseInt(p.trim(), 10) - 1);
        const newPdfDoc = await PDFDocument.create();
        for (let i of pages) {
          if (i < totalPages) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
            newPdfDoc.addPage(copiedPage);
          }
        }
        const pdfBytes = await newPdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `extracted_pages.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }

      setLoading(false);
      setFile(null);
      setFileName('');
    };

    fileReader.readAsArrayBuffer(file);
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.pdf' });

  return (
    <Container maxWidth="md" sx={{ marginTop: '100px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your PDF to Split
      </Typography>

      <Box sx={{ mb: 3 }} >
        <TextField
          select
          label="Select Mode"
          value={splitMode}
          onChange={(e) => setSplitMode(e.target.value)}
          fullWidth
        >
          <MenuItem value="splitByRange">Split by Range</MenuItem>
          <MenuItem value="extractPages">Extract Pages</MenuItem>
        </TextField>
      </Box>

      {splitMode === 'splitByRange' && (
        <>
          <Box sx={{ mb: 3 }}>
            <TextField
              select
              label="Range Mode"
              value={rangeMode}
              onChange={(e) => setRangeMode(e.target.value)}
              fullWidth
            >
              <MenuItem value="custom">Custom Ranges</MenuItem>
              <MenuItem value="fixed">Fixed Ranges</MenuItem>
            </TextField>
          </Box>

          {rangeMode === 'custom' ? (
            <>
              {customRanges.map((range, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="From Page"
                    type="number"
                    value={range.from}
                    onChange={(e) => {
                      const newRanges = [...customRanges];
                      newRanges[index].from = parseInt(e.target.value, 10);
                      setCustomRanges(newRanges);
                    }}
                    fullWidth
                  />
                  <TextField
                    label="To Page"
                    type="number"
                    value={range.to}
                    onChange={(e) => {
                      const newRanges = [...customRanges];
                      newRanges[index].to = parseInt(e.target.value, 10);
                      setCustomRanges(newRanges);
                    }}
                    fullWidth
                  />
                </Box>
              ))}
              <Button onClick={handleAddRange}>Add Range</Button>
            </>
          ) : (
            <TextField
              label="Fixed Range Count"
              type="number"
              value={fixedRangeCount}
              onChange={(e) => setFixedRangeCount(parseInt(e.target.value, 10))}
              fullWidth
              sx={{ mb: 3 }}
            />
          )}
        </>
      )}

      {splitMode === 'extractPages' && (
        <TextField
          label="Pages to Extract (comma-separated)"
          value={pagesToExtract}
          onChange={(e) => setPagesToExtract(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
      )}

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
          <input type="file" hidden onChange={handleFileChange} accept=".pdf" />
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
          onClick={handleSplit}
          disabled={!file || loading}
          sx={{ width: '80px', mr: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Split'}
        </Button>
        <Button variant="outlined" onClick={() => setFile(null)} sx={{ width: '80px' }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default UploaderPage;
