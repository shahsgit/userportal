import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';
dotenv.config();

const port = process.env.PORT || 5001;

import userRoutes from './routes/userRoutes.js';
connectDB();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
  }));
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('/api/users', userRoutes);
app.get('/', (req, res)=>{
    res.send('Hello World');
})
app.listen(port, ()=>console.log(`Server is listening on the port ${port}`));