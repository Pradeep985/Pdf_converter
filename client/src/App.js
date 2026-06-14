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
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
