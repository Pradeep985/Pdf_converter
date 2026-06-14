const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

function cleanup(...files) {
  files.forEach(f => { try { if (fs.existsSync(f)) fs.unlinkSync(f); } catch (e) {} });
}

router.post('/pdf-to-word', upload.single('pdfFile'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const inputPath = path.join(__dirname, '../', req.file.path);
  const ext = '.docx';

  try {
    const pdfBuf = fs.readFileSync(inputPath);
    // Convert PDF to DOCX using LibreOffice
    const docxBuf = await libre.convertAsync(pdfBuf, ext, undefined);
    
    // Send back the docx file
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${req.file.originalname.replace(/\.[^/.]+$/, "")}.docx"`,
    });
    res.send(docxBuf);
  } catch (err) {
    console.error('Error converting PDF to Word:', err);
    res.status(500).send('Error during conversion.');
  } finally {
    cleanup(inputPath);
  }
});

module.exports = router;
