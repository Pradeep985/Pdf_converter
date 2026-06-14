import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import RotateRightIcon from '@mui/icons-material/RotateRight';

const RotatePdf = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/rotate-pdf');
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer', background: 'linear-gradient(135deg, #f5f5f5 30%, #e3f2fd 90%)', borderRadius: '12px', transition: '0.3s', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', '&:hover': { boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)', transform: 'scale(1.05)' }, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#3f51b5', mb: 1 }}>
          <RotateRightIcon sx={{ mr: 1, fontSize: '2.5rem', transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(90deg)' } }} />
          Rotate PDF
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!</Typography>
      </CardContent>
    </Card>
  );
};

export default RotatePdf;
