// client/src/components/WordToPdf.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';

const WordToPdf = () => {
  const handleCardClick = () => {
    // Open the WordUploader page in a new tab
    window.open('/word-to-pdf', '_blank');
  };

  return (
    <Card
      onClick={handleCardClick} // Call handleCardClick on click
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
          <DescriptionIcon
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
          Word to PDF
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Convert Word documents to PDF format easily.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WordToPdf;
