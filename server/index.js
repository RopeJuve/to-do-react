import express from 'express';
import mongoose from 'mongoose';
import boardRouter from './routes/boardRouts.js';
import cors from 'cors';
import tasksRouter from './routes/taskRouts.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/boards', boardRouter);
app.use('/api/boards/:boardID/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send('To Do Kanban Board API');
});



mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });