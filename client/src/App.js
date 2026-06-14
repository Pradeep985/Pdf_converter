import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MainPage from './components/MainPage/MainPage';

import MergeUploader from './components/Uploader/MergeUploader';
import SplitUploader from './components/Uploader/SplitUploader';
import WordUploader from './components/Uploader/WordUploader';
import PptUploader from './components/Uploader/PptUploader';
import ExcelUploader from './components/Uploader/ExcelUploader';
import ImageUploader from './components/Uploader/ImageUploader';
import RotateUploader from './components/Uploader/RotateUploader';
import WatermarkUploader from './components/Uploader/WatermarkUploader';
import UnlockUploader from './components/Uploader/UnlockUploader';
import CompressUploader from './components/Uploader/CompressUploader';
import RemovePagesUploader from './components/Uploader/RemovePagesUploader';
import OrganizePdfUploader from './components/Uploader/OrganizePdfUploader';
import AddPageNumbersUploader from './components/Uploader/AddPageNumbersUploader';
import ProtectPdfUploader from './components/Uploader/ProtectPdfUploader';
import SignPdfUploader from './components/Uploader/SignPdfUploader';
import PdfToJpgUploader from './components/Uploader/PdfToJpgUploader';
import RepairPdfUploader from './components/Uploader/RepairPdfUploader';
import HtmlToPdfUploader from './components/Uploader/HtmlToPdfUploader';
import PdfToWordUploader from './components/Uploader/PdfToWordUploader';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/merge-pdf" element={<MergeUploader />} />
          <Route path="/split-pdf" element={<SplitUploader />} />
          <Route path="/word-to-pdf" element={<WordUploader />} />
          <Route path="/ppt-to-pdf" element={<PptUploader />} />
          <Route path="/excel-to-pdf" element={<ExcelUploader />} />
          <Route path="/image-to-pdf" element={<ImageUploader />} />
          <Route path="/rotate-pdf" element={<RotateUploader />} />
          <Route path="/watermark-pdf" element={<WatermarkUploader />} />
          <Route path="/unlock-pdf" element={<UnlockUploader />} />
          <Route path="/compress-pdf" element={<CompressUploader />} />
          
          <Route path="/remove-pages" element={<RemovePagesUploader />} />
          <Route path="/organize-pdf" element={<OrganizePdfUploader />} />
          <Route path="/add-page-numbers" element={<AddPageNumbersUploader />} />
          <Route path="/protect-pdf" element={<ProtectPdfUploader />} />
          <Route path="/sign-pdf" element={<SignPdfUploader />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpgUploader />} />
          <Route path="/repair-pdf" element={<RepairPdfUploader />} />
          <Route path="/html-to-pdf" element={<HtmlToPdfUploader />} />
          <Route path="/pdf-to-word" element={<PdfToWordUploader />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
