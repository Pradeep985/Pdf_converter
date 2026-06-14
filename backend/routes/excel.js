const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { exec } = require('child_process');
const libre = require('libreoffice-convert');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../uploads');
const upload = multer({ dest: 'uploads/' });

function sendAndCleanup(res, input, output) {
    res.download(output, (err) => {
        if (err) console.error('Error sending file:', err);
        cleanup(input, output);
    });
}

function cleanup(input, output) {
    try { if (fs.existsSync(input)) fs.unlinkSync(input); } catch (e) {}
    try { if (fs.existsSync(output)) fs.unlinkSync(output); } catch (e) {}
}

router.post('/excel-to-pdf', upload.single('excelFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputFilePath = path.join(__dirname, '../', req.file.path);
    const outputFilePath = path.join(uploadsDir, `${req.file.filename}.pdf`);

    try {
        if (process.platform === 'win32') {
            const psCommand = `powershell -ExecutionPolicy Bypass -File "${path.join(__dirname, '../scripts/convert-xlsx-to-pdf.ps1')}" -xlsxPath "${inputFilePath}" -pdfPath "${outputFilePath}"`;
            exec(psCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error('PowerShell error:', stderr);
                    res.status(500).send('Error converting file');
                    return cleanup(inputFilePath, outputFilePath);
                }
                sendAndCleanup(res, inputFilePath, outputFilePath);
            });
        } else {
            const file = fs.readFileSync(inputFilePath);
            libre.convert(file, '.pdf', undefined, (err, pdfBuf) => {
                if (err) {
                    console.error('LibreOffice error:', err);
                    res.status(500).send('Error converting file');
                    return cleanup(inputFilePath, outputFilePath);
                }
                fs.writeFileSync(outputFilePath, pdfBuf);
                sendAndCleanup(res, inputFilePath, outputFilePath);
            });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Error converting file');
        cleanup(inputFilePath, outputFilePath);
    }
});

module.exports = router;
