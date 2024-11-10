const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/ppt-to-pdf', upload.single('pptFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputFilePath = path.join(__dirname, '../uploads', req.file.filename);
    const outputFilePath = path.join(__dirname, '../uploads', `${path.parse(req.file.filename).name}.pdf`);

    const psCommand = `powershell -ExecutionPolicy Bypass -File ./scripts/convert-ppt-to-pdf.ps1 -pptxPath "${inputFilePath}" -pdfPath "${outputFilePath}"`;

    exec(psCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during conversion: ${stderr}`);
            return res.status(500).send('Error during conversion.');
        }

        console.log(`Conversion successful: ${stdout}`);

        res.download(outputFilePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('Error sending file.');
            }

            fs.unlinkSync(inputFilePath); 
            fs.unlinkSync(outputFilePath);
        });
    });
});

module.exports = router;
