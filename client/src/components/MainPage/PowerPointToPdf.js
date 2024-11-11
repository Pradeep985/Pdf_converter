import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';

const PowerPointToPdf = () => {
  const handleCardClick = () => {
    // Open the PptUploader page in a new tab
    window.open('/ppt-to-pdf', '_blank');
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        minWidth: 275,
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #f5f5f5 30%, #e3f2fd 90%)', // Gradient background
        borderRadius: '12px',
        transition: '0.3s',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          transform: 'scale(1.05)', // Scale on hover
        },
        padding: { xs: '16px', sm: '20px' }, // Responsive padding
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            color: '#3f51b5',
            mb: 1,
            fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Dynamic font size
          }}
        >
          <SlideshowIcon
            sx={{
              mr: 1,
              color: '#3f51b5',
              fontSize: { xs: '2rem', sm: '2.5rem' }, // Responsive icon size
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2) rotate(15deg)', // Enlarge and rotate icon on hover
              },
            }}
          />
          PowerPoint to PDF
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }} color="text.secondary">
          Convert your PowerPoint presentations to PDF format for easy sharing.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PowerPointToPdf;
