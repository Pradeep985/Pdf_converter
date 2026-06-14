import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
const HtmlToPdf = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/html-to-pdf')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <LanguageIcon />HTML to PDF
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Paste HTML code to convert it into a clean PDF.</Typography>
      </CardContent>
    </Card>
  );
};
export default HtmlToPdf;
