import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: 'Merge PDF', link: '/merge-pdf' },
    { label: 'Split PDF', link: '/split-pdf' },
    { label: 'Image to PDF', link: '/image-to-pdf' },
    { label: 'Excel to PDF', link: '/excel-to-pdf' },
    { label: 'Word to PDF', link: '/word-to-pdf' },
    { label: 'PPT to PDF', link: '/ppt-to-pdf' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5', boxShadow: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and Icon Button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fff' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => (window.location.href = '/')}
              sx={{
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
            </Typography>
          </Box>

          {/* Buttons for large screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                onClick={() => window.open(item.link, '_blank')}
                sx={{
                  ml: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Menu icon for small screens */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Drawer for small screens */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' } }}
            PaperProps={{
              sx: {
                top: '64px', // Set to AppBar's height to start just below it
                background: 'linear-gradient(to right, #3f51b5, #5a55ae)',
                color: '#fff',
                width: 250,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              },
            }}
            ModalProps={{
              BackdropProps: { invisible: true }, // Removes background shadow
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'auto', // Allow drawer to adjust height based on content size
              }}
              role="presentation"
              onClick={handleDrawerToggle} // Close drawer on item click
            >
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />

              {/* Menu items with custom styling */}
              <List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                {menuItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton
                      onClick={() => window.open(item.link, '_blank')}
                      sx={{
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        padding: '10px 20px',
                        borderRadius: '8px',
                        margin: '4px 0',
                      }}
                    >
                      <ListItemText primary={item.label} sx={{ textAlign: 'center' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
