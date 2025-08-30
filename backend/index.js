import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes import
import authRouter from './Routes/CreateUser.js';
import dataRouter from './Routes/DisplayData.js';
import seedRouter from './Routes/seedFood.js';

// ✅ Mount the routers at their correct, non-conflicting paths
app.use('/api/auth', authRouter); 
app.use('/api/data', dataRouter);
app.use('/api/seed', seedRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});