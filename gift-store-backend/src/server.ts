import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Giftora Backend API' });
});

// Root welcome
app.get('/', (req: Request, res: Response) => {
  res.send('Giftora E-Commerce API is running.');
});

app.listen(PORT, () => {
  console.log(`[Giftora API] Server running on port ${PORT}`);
});
