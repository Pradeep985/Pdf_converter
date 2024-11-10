// client/src/components/JpgToPdf.js
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const JpgToPdf = () => {
  const handleCardClick = () => {
    // Open the ImageUploader page in a new tab
    window.open('/image-to-pdf', '_blank');
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        minWidth: 275,
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #f5f5f5 30%, #e3f2fd 90%)',
        borderRadius: '12px',
        transition: '0.3s',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          transform: 'scale(1.05)',
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
          <PictureAsPdfIcon
            sx={{
              mr: 1,
              color: '#3f51b5',
              fontSize: '2.5rem',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2) rotate(15deg)',
              },
            }}
          />
          Images to PDF
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Convert images (JPG, PNG, GIF, etc.) to PDF format.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JpgToPdf;