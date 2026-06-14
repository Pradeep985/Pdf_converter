const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { exec } = require('child_process');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../uploads');
const upload = multer({ dest: 'uploads/' });

function cleanup(...files) {
  files.forEach(f => { try { if (fs.existsSync(f)) fs.unlinkSync(f); } catch (e) {} });
}

// Ghostscript repair: re-write the PDF through pdfwrite device
router.post('/repair-pdf', upload.single('pdfFile'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  const input = path.join(__dirname, '../', req.file.path);
  const output = path.join(uploadsDir, `${req.file.filename}_repaired.pdf`);
  const gsCmd = process.platform === 'win32' ? 'gswin64c' : 'gs';
  const cmd = `"${gsCmd}" -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${output}" "${input}"`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('Repair error:', stderr || err.message);
      cleanup(input, output);
      return res.status(500).send('Repair failed. Ensure Ghostscript is installed.');
    }
    res.download(output, (dlErr) => {
      if (dlErr) console.error('Download error:', dlErr);
      cleanup(input, output);
    });
  });
});

module.exports = router;
