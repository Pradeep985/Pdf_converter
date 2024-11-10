import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Container from '@mui/material/Container';

function ResponsiveAppBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5', boxShadow: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fff' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => (window.location.href = '/')}
            sx={{
              // mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#ffffff',
              textDecoration: 'none',
              ml: 2,
              '&:hover': {
                color: '#e3f2fd',
              },
            }}
          >
            PDF Converter
          </Typography>

          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#fff' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#ffffff',
              textDecoration: 'none',
              '&:hover': {
                color: '#e3f2fd',
              },
            }}
          >
            PDF Converter
          </Typography> */}

          <Button
            color="inherit"
            onClick={() => window.open('/merge-pdf', '_blank')} // Open Merge PDF in a new tab
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Merge PDF
          </Button>
          <Button
            color="inherit"
            onClick={() => window.open('/split-pdf', '_blank')} // Open Split PDF in a new tab
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Split PDF
          </Button>
          <Button
            color="inherit"
            onClick={() => window.open('/image-to-pdf', '_blank')} // Open Convert PDF in a new tab
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Image to PDF
          </Button>
          <Button
            color="inherit"
            onClick={() => window.open('/excel-to-pdf', '_blank')} // Open Convert PDF in a new tab
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Excel to PDF
          </Button>
          <Button
            color="inherit"
            onClick={() => window.open('/word-to-pdf', '_blank')} // Open Convert PDF in a new tab
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Word to PDF
          </Button>
          <Button
            color="inherit"
            onClick={() => window.open('/ppt-to-pdf', '_blank')} // Open Convert PDF in a new tab
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            PPT to PDF
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
