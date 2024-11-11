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

      <Typography
        padding="40px"
        variant="h4"
        align="center"
        className="main-title"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#3f51b5',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Welcome to PDF Converter Tools
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '40px' }}>
        {/* Advertisement spaces */}
        {[...Array(5)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                height: 200,
                backgroundColor: '#FF5722',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
                marginBottom: '20px',
                boxShadow: 4,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              <Typography variant="h6">Advertisement {index + 1}</Typography>
            </Box>
          </Grid>
        ))}

        {/* PDF Converter Tools */}
        <Grid container spacing={3} justifyContent="center">
          {[{ component: <MergePdf /> },
            { component: <SplitPdf /> },
            { component: <ExcelToPdf />,},
            { component: <JpgToPdf />,  },
            { component: <WordToPdf />, },
            { component: <PowerPointToPdf />,  }].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  padding: 3,
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: 2,
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  {item.label}
                </Typography>
                {item.component}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
