import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SplitPdf = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    // Navigate to the UploaderPage
    window.open('/split-pdf', '_blank'); // Use navigate instead of history.push
  };

  return (
    <Card
      onClick={handleClick}
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
          <CallSplitIcon
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
          Split PDF
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Easily split your PDF into smaller, manageable parts.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SplitPdf;
