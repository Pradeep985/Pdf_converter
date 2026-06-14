import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
const PdfToWord = () => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/pdf-to-word')} sx={{ cursor: 'pointer', borderRadius: '12px', transition: '0.3s', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0f172a', mb: 1 }}>
          <DescriptionIcon />PDF to Word
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }} color="text.secondary">Convert your PDF into an editable Word document.</Typography>
      </CardContent>
    </Card>
  );
};
export default PdfToWord;
