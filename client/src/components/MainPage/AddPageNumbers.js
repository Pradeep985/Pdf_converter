import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import PinIcon from '@mui/icons-material/Pin';
const AddPageNumbers = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/add-page-numbers')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <PinIcon />Add Page Numbers
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Stamp page numbers onto every page of your PDF.</Typography>
      </CardContent>
    </Card>
  );
};
export default AddPageNumbers;
