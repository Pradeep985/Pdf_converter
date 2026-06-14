const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { initDb, getStats } = require('./db');
const excelRouter = require('./routes/excel');
const powerpointRoutes = require('./routes/powerpoint');
const wordToPdfRouter = require('./routes/word')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
initDb();

const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/api', excelRouter);
app.use('/api/powerpoint-to-pdf', powerpointRoutes);
app.use('/api/word', wordToPdfRouter);
app.use('/api', require('./routes/pdfToWord'));
app.use('/', require('./routes/compress'));
app.use('/', require('./routes/repair'));

// Stats Endpoint
app.get('/api/stats', async (req, res) => {
  const stats = await getStats();
  res.json(stats);
});

app.post('/api/stats/increment', async (req, res) => {
  await incrementStat();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
