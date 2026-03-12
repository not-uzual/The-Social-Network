import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT =  8080;

connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});