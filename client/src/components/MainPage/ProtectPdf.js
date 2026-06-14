import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
const ProtectPdf = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/protect-pdf')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <LockIcon />Protect PDF
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Add a password to prevent unauthorized access.</Typography>
      </CardContent>
    </Card>
  );
};
export default ProtectPdf;
