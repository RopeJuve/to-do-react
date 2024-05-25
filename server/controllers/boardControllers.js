import mongoose from "mongoose";
import { TodoBoard } from "../Model/BoardSchema.model.js";

export const getBoards = async (req, res) => {
  try {
    const boards = await TodoBoard.find().lean();
    res.status(200).json(boards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBoard = async (req, res) => {
  const { id } = req.params;
  try {
    const board = await TodoBoard.findById(id).lean();
    res.status(200).json(board);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBoard = async (req, res) => {
  const board = req.body;
  const newBoard = new TodoBoard(board);
  try {
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No board with id: ${id}`);
  const updatedBoard = { title, columns };
  await TodoBoard.findByIdAndUpdate(id, updatedBoard, { new: true });
  res.json(updatedBoard);
};

export const deleteBoard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No board with id: ${id}`);
  }
  try {
    const result = await TodoBoard.findByIdAndDelete(id);
    if (result) {
      res.json({ message: "Board deleted successfully." });
    } else {
      res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
