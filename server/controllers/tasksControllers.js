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
    const { task, newColumnTitle } = req.body;

    if (!mongoose.Types.ObjectId.isValid(boardID)) {
        return res.status(404).send(`No board with id: ${boardID}`);
    }
    try {
        const boards = await TodoBoard.find();
        const board = boards.find(board => board._id.toString() === boardID.toString());
        if (!board) {
            return res.status(404).send(`No board with id: ${boardID}`);
        }

        const column = board.columns.find(col => col._id.toString() === columnID.toString());
        if (!column) {
            return res.status(404).send(`No column with id: ${columnID}`);
        }

        const taskToUpdate = column.tasks.find(task => task._id.toString() === id.toString());
        if (!taskToUpdate) {
            return res.status(404).send(`No task with id: ${id}`);
        }

        if (newColumnTitle) {
            const newColumn = board.columns.find(col => col.title === newColumnTitle);
            if (!newColumn) {
                return res.status(404).send(`No column with title: ${newColumnTitle}`);
            }

            const duplicateTask = newColumn.tasks.find(t => t._id.toString() === id.toString());
            if (duplicateTask) {
                return res.status(409).json({ message: 'Task already exists in the new column' });
            }
            column.tasks.pull(taskToUpdate);
            newColumn.tasks.push(taskToUpdate);
            taskToUpdate.set(task);
        } else {
            taskToUpdate.set(task);
        }
        await board.save();
        res.status(200).json(taskToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const moveTask = async (req, res) => {
    const { boardID, columnID, id } = req.params;
    const { newColumnID } = req.body;
    if (!mongoose.Types.ObjectId.isValid(boardID)) {
        return res.status(404).send(`No board with id: ${boardID}`);
    }
    try {
        const boards = await TodoBoard.find();
        const board = boards.find(board => board._id.toString() === boardID.toString());
        const column = board.columns.find(col => col._id.toString() === columnID.toString());
        const newColumn = board.columns.find(col => col._id.toString() === newColumnID.toString());
        const taskToMove = column.tasks.find(task => task._id.toString() === id.toString());
        column.tasks.pull(taskToMove);
        newColumn.tasks.push(taskToMove);
        await board.save();
        res.status(200).json(taskToMove);
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