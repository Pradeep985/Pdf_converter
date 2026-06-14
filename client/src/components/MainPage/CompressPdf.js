import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import CompressIcon from '@mui/icons-material/Compress';

const CompressPdf = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/compress-pdf');
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <CompressIcon sx={{ mr: 1, fontSize: '2.5rem', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(0.9)' } }} />
          Compress PDF
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }} color="text.secondary">
          Reduce file size while optimizing for maximal PDF quality.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompressPdf;
