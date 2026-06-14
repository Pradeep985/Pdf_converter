import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
const OrganizePdf = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/organize-pdf')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <DashboardCustomizeIcon />Organize PDF
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Reorder pages by dragging them into the right sequence.</Typography>
      </CardContent>
    </Card>
  );
};
export default OrganizePdf;
