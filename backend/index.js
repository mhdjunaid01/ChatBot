import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
 
import connectDB from './config/db.js';
import errorHandler from './middleware/errHandler.js';

import authRoute from './routes/authRoute.js';
import ChatBotRoute from './routes/ChatBotRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//connect to db
connectDB();
// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())




//route
app.use("/auth", authRoute);
app.use("/chatbot",ChatBotRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});