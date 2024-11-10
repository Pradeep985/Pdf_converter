const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const excelRouter = require('./routes/excel');
const powerpointRoutes = require('./routes/powerpoint');
const wordToPdfRouter = require('./routes/word')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/api', excelRouter);
app.use('/api/powerpoint-to-pdf', powerpointRoutes);

app.use('/api/word', wordToPdfRouter);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
