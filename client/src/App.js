import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header'; 
import MainPage from './components/MainPage/MainPage';
import Splitpdf from './components/Uploader/SplitUploader';
import WordUploader from './components/Uploader/WordUploader';
import Footer from './components/footer/Footer';
import PptUploader from './components/Uploader/PptUploader';
import ExcelUploader from './components/Uploader/ExcelUploader';
import MergeUploader from './components/Uploader/MergeUploader';
import ImageUploader from './components/Uploader/ImageUploader';

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/split-pdf" element={<Splitpdf />} />
        <Route path="/word-to-pdf" element={<WordUploader />} />
        <Route path="/ppt-to-pdf" element={<PptUploader />} />
        <Route path="/excel-to-pdf" element={<ExcelUploader />} />
        <Route path="/merge-pdf" element={<MergeUploader />} />
        <Route path="/image-to-pdf" element={<ImageUploader />} />
        <Route path="/" element={<MainPage />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
