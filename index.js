import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
// import roomRouter from './routes/roomRouter.js';

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

app.use('/room',roomRouter)
app.use('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

//connect to mongoDB
const startServer = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port: ${port}`))
    
  } catch (error) {
    console.log(error);
  }
};

startServer();