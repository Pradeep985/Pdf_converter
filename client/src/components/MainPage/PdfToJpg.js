import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
const PdfToJpg = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/pdf-to-jpg')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <ImageIcon />PDF to JPG
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Convert each PDF page into a high-quality JPG image.</Typography>
      </CardContent>
    </Card>
  );
};
export default PdfToJpg;
