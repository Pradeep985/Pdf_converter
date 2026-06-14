import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';
const SignPdf = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/sign-pdf')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <DrawIcon />Sign PDF
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Add your text signature to the last page of a PDF.</Typography>
      </CardContent>
    </Card>
  );
};
export default SignPdf;
