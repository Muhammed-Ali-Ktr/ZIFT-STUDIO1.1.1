import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './src/routes/auth.js';
import studentRouter from './src/routes/student.js';
import adminRouter from './src/routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);

// Static frontend
app.use('/student', express.static(path.join(__dirname, 'student')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/image', express.static(path.join(__dirname, 'image')));

app.get('/', (req, res) => {
  res.redirect('/student');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`ZiftStudio Student module listening on port ${PORT}`);
});


