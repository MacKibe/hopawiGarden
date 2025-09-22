import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

dotenv.config();

app.use(cors({
  origin: ['https://hopawi-garden.vercel.app', 'http://localhost:3000'],
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  return res.send('HOPAWI Gardens Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;