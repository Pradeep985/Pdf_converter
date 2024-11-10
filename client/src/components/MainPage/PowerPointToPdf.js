// client/src/components/PowerPointToPdf.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
        padding: '20px',
        position: 'relative',
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
          }}
        >
          <SlideshowIcon
            sx={{
              mr: 1,
              color: '#3f51b5',
              fontSize: '2.5rem',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2) rotate(15deg)', // Enlarge and rotate icon on hover
              },
            }}
          />
          PowerPoint to PDF
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Convert PowerPoint presentations to PDF format.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PowerPointToPdf;
