import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
const RepairPdf = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/repair-pdf')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <BuildIcon />Repair PDF
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Fix a corrupted or damaged PDF file.</Typography>
      </CardContent>
    </Card>
  );
};
export default RepairPdf;
