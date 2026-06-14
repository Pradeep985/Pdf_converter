import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const UnlockPdf = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/unlock-pdf');
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <LockOpenIcon sx={{ mr: 1, fontSize: '2.5rem', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.1)' } }} />
          Unlock PDF
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }} color="text.secondary">
          Remove PDF password security, giving you the freedom to use your PDFs as you want.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UnlockPdf;
