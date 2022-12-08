import express from 'express';
import dotenv from 'dotenv';
import userRouter from "./routes/userRouter.js"
import drivesRouter from './routes/drivesRouter.js';
import mongoose from "mongoose"


dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

app.use(express.json({ limit: '10mb' }));
//routes

app.use('/api/user',userRouter)
app.use('/api/drives',drivesRouter)
app.get('/api', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

//connect to mongoDB
const startServer = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on port: ${port}`))
    
  } catch (error) {
    console.log(error);
  }
};

startServer();