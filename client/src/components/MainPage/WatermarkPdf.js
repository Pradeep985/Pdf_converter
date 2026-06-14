import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';

const WatermarkPdf = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/watermark-pdf');
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer', background: 'linear-gradient(135deg, #f5f5f5 30%, #e3f2fd 90%)', borderRadius: '12px', transition: '0.3s', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', '&:hover': { boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)', transform: 'scale(1.05)' }, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#3f51b5', mb: 1 }}>
          <BrandingWatermarkIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
          Add Watermark
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.</Typography>
      </CardContent>
    </Card>
  );
};

export default WatermarkPdf;
