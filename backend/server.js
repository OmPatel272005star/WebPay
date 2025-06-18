import express from 'express'
import connectToMongoDB from './db/connect.js';
import userRoute from './routes/userRoute.js'
import transactionRoute from './routes/transactionRoute.js';
import userDetailsRoute from './routes/userDetailsRoute.js';
//middleware imports
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';

const app=express();
dotenv.config();
const port=process.env.PORT || 8000;


app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"], 
  methods: ["GET", "POST"],// or your frontend URL
  credentials: true
}));

app.use(cookieParser());


app.use('/api/auth',userRoute);
app.use('/api/transaction',transactionRoute);
app.use('/api/user',userDetailsRoute);

app.listen(port,()=>{
    connectToMongoDB();
    console.log(`server is running on port ${port}`);
})