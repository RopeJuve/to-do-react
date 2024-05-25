import mongoose from "mongoose";
import { TodoBoard, Task } from '../Model/BoardSchema.model.js';


export const getTasks = async (req, res) => {
    try {
        const boardID = req.params.boardID;
        const boards = await TodoBoard.find();
        const board = boards.find(board => board._id.toString() === boardID.toString());
        res.status(200).json(board.columns);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    const { boardID, columnID, id } = req.params;
    console.log(id);
    try {
        const boards = await TodoBoard.find();
        const board = boards.find(board => board._id.toString() === boardID.toString());
        const column = board.columns.find(col => col._id.toString() === columnID.toString());
        const task = column.tasks.find(task => task._id.toString() === id.toString());
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const { boardID } = req.params;
    const task = req.body;
    const newTask = new Task(task);
    if (!mongoose.Types.ObjectId.isValid(boardID)) {
        return res.status(400).json({ message: 'Invalid board ID' });
    }

    try {
        const boards = await TodoBoard.find();
        const board = boards.find(board => board._id.toString() === boardID.toString());
        const column = board.columns.find(col => col.title === newTask.status);
        if (column) {
            column.tasks.push(newTask);
            await board.save();
            res.status(201).json(newTask);
        } else {
            res.status(404).send(`No column with title: ${newTask.status}`);
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { boardID, columnID, id } = req.params;
    const task = req.body;
    if (!mongoose.Types.ObjectId.isValid(boardID)) {
        return res.status(404).send(`No board with id: ${boardID}`);
    }
    try {
        const boards = await TodoBoard.find();
        const board = boards.find(board => board._id.toString() === boardID.toString());
        const column = board.columns.find(col => col._id.toString() === columnID.toString());
        const taskToUpdate = column.tasks.find(task => task._id.toString() === id.toString());
        taskToUpdate.set(task);
        await board.save();
        res.status(200).json(taskToUpdate);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    const { boardID, columnID, id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boardID)) {
        return res.status(404).send(`No board with id: ${boardID}`);
    }
    try {
        const boards = await TodoBoard.find();
        const board = boards.find(board => board._id.toString() === boardID.toString());
        const column = board.columns.find(col => col._id.toString() === columnID.toString());
        const taskToDelete = column.tasks.find(task => task._id.toString() === id.toString());
        column.tasks.pull(taskToDelete);
        await board.save();
        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}