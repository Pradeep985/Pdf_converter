const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const multer = require('multer');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage });

router.post('/word-to-pdf', upload.single('wordFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputFilePath = path.join(uploadsDir, req.file.filename);
    const outputFilePath = path.join(uploadsDir, `${path.parse(req.file.filename).name}.pdf`);

    const psCommand = `powershell -ExecutionPolicy Bypass -File "${path.join(__dirname, '../scripts/convert-docx-to-pdf.ps1')}" -docxPath "${inputFilePath}" -pdfPath "${outputFilePath}"`;
    
    try {
        exec(psCommand, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).send('Error converting file');
            }
            res.download(outputFilePath, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                }
                fs.unlinkSync(inputFilePath); 
                fs.unlinkSync(outputFilePath); 
            });
        });
    } catch (error) {
        res.status(500).send('Error converting file');
    }
});

module.exports = router;
