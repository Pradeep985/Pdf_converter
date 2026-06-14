const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { exec } = require('child_process');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../uploads');
const upload = multer({ dest: 'uploads/' });

function sendAndCleanup(res, input, output) {
    res.download(output, (err) => {
        if (err) console.error('Error sending compressed file:', err);
        cleanup(input, output);
    });
}

function cleanup(input, output) {
    try { if (fs.existsSync(input)) fs.unlinkSync(input); } catch (e) {}
    try { if (fs.existsSync(output)) fs.unlinkSync(output); } catch (e) {}
}

router.post('/compress-pdf', upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputFilePath = path.join(__dirname, '../', req.file.path);
    const outputFilePath = path.join(uploadsDir, `${req.file.filename}_compressed.pdf`);

    try {
        // Use 'gswin64c' for Ghostscript on Windows, 'gs' on Linux
        const gsCmd = process.platform === 'win32' ? 'gswin64c' : 'gs';
        
        // Ghostscript command for screen-quality compression
        const command = `"${gsCmd}" -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputFilePath}" "${inputFilePath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Ghostscript compression error:', stderr || error.message);
                res.status(500).send('Error compressing file. Ensure Ghostscript is installed.');
                return cleanup(inputFilePath, outputFilePath);
            }
            sendAndCleanup(res, inputFilePath, outputFilePath);
        });
    } catch (error) {
        console.error('Server error during compression:', error);
        res.status(500).send('Error compressing file');
        cleanup(inputFilePath, outputFilePath);
    }
});

module.exports = router;
