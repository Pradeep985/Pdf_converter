import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import MergeTypeIcon from '@mui/icons-material/MergeType'; // For Merge PDF
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import CompressIcon from '@mui/icons-material/Compress'; // For Compress PDF
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // For Convert PDF
import WordIcon from '@mui/icons-material/Description'; // For Word to PDF
import PowerPointIcon from '@mui/icons-material/Slideshow'; // For PowerPoint to PDF
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // For Excel to PDF
import EditIcon from '@mui/icons-material/Edit'; // For Edit PDF
import ImageIcon from '@mui/icons-material/Image'; // For JPG to PDF
import HtmlIcon from '@mui/icons-material/Language'; // For HTML to PDF
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; // For Compare PDF
import './MainPage.css'; // Import your CSS for styling

const MainPage = () => {
  return (
    <div className="main-page">
      <Typography padding="40px" variant="h4" align="center" className="main-title" gutterBottom>
        Welcome to PDF Converter Tools
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {/* Merge PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <MergeTypeIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Merge PDF</Typography>
            <Typography variant="body2">
              Combine multiple PDF files into one document.
            </Typography>
            <Button variant="contained" color="primary" href="/merge-pdf" className="tool-button">
              Merge PDFs
            </Button>
          </Paper>
        </Grid>

        {/* Split PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <SplitscreenIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Split PDF</Typography>
            <Typography variant="body2">
              Divide a PDF into separate pages or documents.
            </Typography>
            <Button variant="contained" color="primary" href="/split-pdf" className="tool-button">
              Split PDFs
            </Button>
          </Paper>
        </Grid>

        {/* Compress PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <CompressIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Compress PDF</Typography>
            <Typography variant="body2">
              Reduce the file size of your PDF document.
            </Typography>
            <Button variant="contained" color="primary" href="/compress-pdf" className="tool-button">
              Compress PDFs
            </Button>
          </Paper>
        </Grid>

        {/* Convert PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <PictureAsPdfIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Convert PDF</Typography>
            <Typography variant="body2">
              Convert PDFs to Word, Excel, JPG, and more formats.
            </Typography>
            <Button variant="contained" color="primary" href="/convert-pdf" className="tool-button">
              Convert PDFs
            </Button>
          </Paper>
        </Grid>

        {/* Word to PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <WordIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Word to PDF</Typography>
            <Typography variant="body2">
              Convert Word documents into PDF format.
            </Typography>
            <Button variant="contained" color="primary" href="/word-to-pdf" className="tool-button">
              Convert to PDF
            </Button>
          </Paper>
        </Grid>

        {/* PowerPoint to PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <PowerPointIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">PowerPoint to PDF</Typography>
            <Typography variant="body2">
              Convert PowerPoint presentations into PDF format.
            </Typography>
            <Button variant="contained" color="primary" href="/powerpoint-to-pdf" className="tool-button">
              Convert to PDF
            </Button>
          </Paper>
        </Grid>

        {/* Excel to PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <InsertDriveFileIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Excel to PDF</Typography>
            <Typography variant="body2">
              Convert Excel spreadsheets into PDF format.
            </Typography>
            <Button variant="contained" color="primary" href="/excel-to-pdf" className="tool-button">
              Convert to PDF
            </Button>
          </Paper>
        </Grid>

        {/* Edit PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <EditIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Edit PDF</Typography>
            <Typography variant="body2">
              Edit your PDF documents with ease.
            </Typography>
            <Button variant="contained" color="primary" href="/edit-pdf" className="tool-button">
              Edit PDFs
            </Button>
          </Paper>
        </Grid>

        {/* JPG to PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <ImageIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">JPG to PDF</Typography>
            <Typography variant="body2">
              Convert JPG images into PDF format.
            </Typography>
            <Button variant="contained" color="primary" href="/jpg-to-pdf" className="tool-button">
              Convert to PDF
            </Button>
          </Paper>
        </Grid>

        {/* HTML to PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <HtmlIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">HTML to PDF</Typography>
            <Typography variant="body2">
              Convert HTML pages into PDF format.
            </Typography>
            <Button variant="contained" color="primary" href="/html-to-pdf" className="tool-button">
              Convert to PDF
            </Button>
          </Paper>
        </Grid>

        {/* Compare PDF Component */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={6} className="tool-card">
            <CompareArrowsIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5">Compare PDF</Typography>
            <Typography variant="body2">
              Compare two PDF documents for differences.
            </Typography>
            <Button variant="contained" color="primary" href="/compare-pdf" className="tool-button">
              Compare PDFs
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
