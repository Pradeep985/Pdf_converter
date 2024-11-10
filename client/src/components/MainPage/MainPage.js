import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import MergePdf from './MergePdf';
import SplitPdf from './SplitPdf';
import WordToPdf from './WordToPdf';
import PowerPointToPdf from './PowerPointToPdf';
import ExcelToPdf from './ExcelToPdf';
import JpgToPdf from './JpgToPdf';

import './MainPage.css';

const MainPage = () => {
  return (
    <Container className="cont" sx={{ marginTop: '100px', paddingBottom: '80px' }}>
      {/* Flowing shapes */}
      <div className="flowing-shape"></div>
      <div className="flowing-shape"></div>
      <div className="flowing-shape"></div>
      <div className="flowing-shape"></div>

      <Typography padding="40px" variant="h4" align="center" className="main-title" gutterBottom>
        Welcome to PDF Converter Tools
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '40px' }}>
        {/* Advertisement spaces */}
        {[...Array(5)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                height: 200, // Increased height for advertisement cards
                backgroundColor: '#FF5722', // Different background color
                color: 'white', // White text
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
                marginBottom: '20px',
                boxShadow: 4,
                transition: 'transform 0.3s, box-shadow 0.3s', // Transition for hover effect
                '&:hover': {
                  transform: 'scale(1.05)', // Scale up on hover
                  boxShadow: 6, // Increase shadow on hover
                },
                fontSize: '1.5rem', // Larger font size for advertisement cards
              }}
            >
              <Typography variant="h6">Advertisement {index + 1}</Typography>
            </Box>
          </Grid>
        ))}

        {/* PDF Converter Tools */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 2,
              backgroundColor: '#fff', // White background for functional cards
              borderRadius: '8px',
              boxShadow: 2,
              textAlign: 'center',
            }}>
              <MergePdf />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 2,
              backgroundColor: '#fff', // White background for functional cards
              borderRadius: '8px',
              boxShadow: 2,
              textAlign: 'center',
            }}>
              <SplitPdf />
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 2,
              backgroundColor: '#fff', // White background for functional cards
              borderRadius: '8px',
              boxShadow: 2,
              textAlign: 'center',
            }}>
              <CompressPdf />
            </Box>
          </Grid> */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 2,
              backgroundColor: '#fff', // White background for functional cards
              borderRadius: '8px',
              boxShadow: 2,
              textAlign: 'center',
            }}>
              <ExcelToPdf />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 2,
              backgroundColor: '#fff', // White background for functional cards
              borderRadius: '8px',
              boxShadow: 2,
              textAlign: 'center',
            }}>
              <JpgToPdf />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 2,
              backgroundColor: '#fff', // White background for functional cards
              borderRadius: '8px',
              boxShadow: 2,
              textAlign: 'center',
            }}>
              <WordToPdf />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 2,
              backgroundColor: '#fff', // White background for functional cards
              borderRadius: '8px',
              boxShadow: 2,
              textAlign: 'center',
            }}>
              <PowerPointToPdf />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
