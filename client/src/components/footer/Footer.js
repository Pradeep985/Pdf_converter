import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import './footer.css'; // Import your CSS file if needed

const Footer = ({ links = [], year = new Date().getFullYear() }) => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', padding: '40px 0', marginTop: '40px' }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" color="textSecondary">
          © {year} PDF Converter Tools. All Rights Reserved.
        </Typography>
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          {links.length > 0 && links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              color="inherit"
              sx={{
                margin: '0 15px',
                fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {link.text}
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
