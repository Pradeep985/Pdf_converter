import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import './footer.css'; // Import your CSS file if needed

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', padding: '40px 0', marginTop: '40px' }}> {/* Increased top and bottom padding */}
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" color="textSecondary"> {/* Increased font size */}
          © {new Date().getFullYear()} PDF Converter Tools. All Rights Reserved.
        </Typography>
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          {/* Uncomment these links if needed */}
          <Link href="#" color="inherit" sx={{ margin: '0 15px', fontSize: '0.9rem' }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ margin: '0 15px', fontSize: '0.9rem' }}>
            Terms of Service
          </Link>
          <Link href="#" color="inherit" sx={{ margin: '0 15px', fontSize: '0.9rem' }}>
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
