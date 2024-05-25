import express from 'express';

import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasksControllers.js';

const tasksRouter = express.Router({ mergeParams: true });

tasksRouter.get('/', getTasks);
tasksRouter.get('/column/:columnID/task/:id', getTask);
tasksRouter.post('/', createTask);
tasksRouter.put('/column/:columnID/task/:id', updateTask);
tasksRouter.delete('/column/:columnID/task/:id', deleteTask);

export default tasksRouter;