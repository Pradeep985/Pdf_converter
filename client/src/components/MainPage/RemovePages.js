import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
const RemovePages = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/remove-pages')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <DeleteSweepIcon />Remove Pages
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Delete specific pages from a PDF document.</Typography>
      </CardContent>
    </Card>
  );
};
export default RemovePages;
