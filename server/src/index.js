import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { contactRoutes } from './controllers/contactRoute.js';

const app = express();

dotenv.config();

app.use(cors({
  origin: ['https://hopawi-garden.vercel.app', 'http://localhost:5173'],
}));
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  return res.send('HOPAWI Gardens Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
