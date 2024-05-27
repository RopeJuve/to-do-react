// BoardContext.js
import React, { createContext, useState, useContext } from 'react';

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
    const [boards, setBoards] = useState(null);
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBoards = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/boards');
            const data = await response.json();
            setBoards(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }

    };

    const addBoard = async (board) => {
        try {
            const response = await fetch('http://localhost:3000/api/boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(board)
            });
            const newBoard = await response.json();
            setBoards((prevBoards) => [...prevBoards, newBoard]);
            return newBoard;
        } catch (error) {
            setError(err.message);
        }
    }

    const removeBoard = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/boards/${id}`, {
                method: 'DELETE'
            });
            setBoards((prevBoards) => prevBoards.filter(board => board._id !== id));
        } catch (error) {
            setError(err.message);
        }
    }

    const fetchBoard = async (boardId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/boards/${boardId}`);
            const data = await response.json();
            setBoard(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const addTask = async (boardId, task) => {
        try {
            const response = await fetch(`http://localhost:3000/api/boards/${boardId}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            const newTask = await response.json();

            setBoard((prevBoard) => {
                const updatedColumns = prevBoard.columns.map((column) => {
                    if (column.title === task.status) {
                        return {
                            ...column,
                            tasks: [...column.tasks, newTask],
                        };
                    }
                    return column;
                });

                return {
                    ...prevBoard,
                    columns: updatedColumns,
                };
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const updateTask = async (boardId, columnId, taskId, updatedTask) => {
        try { ///column/:columnID/task/:id
            await fetch(`http://localhost:3000/api/boards/${boardId}/tasks/column/${columnId}/task/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });

            setBoard((prevBoard) => {
                const updatedColumns = prevBoard.columns.map((column) => {
                    if (column._id === updateTask.status) {
                        return {
                            ...column,
                            tasks: column.tasks.map((task) =>
                                task._id === taskId ? updatedTask : task
                            ),
                        };
                    }
                    return column;
                });

                return {
                    ...prevBoard,
                    columns: updatedColumns,
                };
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const updateTaskAndMove = async (boardId, columnId, taskId, updatedTask) => {
        try {
            await fetch(`http://localhost:3000/api/boards/${boardId}/tasks/column/${columnId}/task/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });

            setBoard((prevBoard) => {
                const updatedColumns = prevBoard.columns.map((column) => {
                    if (column._id === columnId && updatedTask.task.status !== column.title) {
                        return {
                            ...column,
                            tasks: column.tasks.filter((task) => task._id !== taskId),
                        };
                    } else if (column.title === updatedTask.newColumnTitle) {
                        return {
                            ...column,
                            tasks: [...column.tasks, updatedTask.task],
                        };
                    }
                });

                return {
                    ...prevBoard,
                    columns: updatedColumns,
                };
            });
        } catch (err) {
            setError(err.message);
        }
    }

    const deleteTask = async (boardId, columnId, taskId) => {
        try {
            await fetch(`http://localhost:3000/api/boards/${boardId}/tasks/column/${columnId}/task/${taskId}`, {
                method: 'DELETE',
            });

            setBoard((prevBoard) => {
                const updatedColumns = prevBoard.columns.map((column) => {
                    if (column._id === columnId) {
                        return {
                            ...column,
                            tasks: column.tasks.filter((task) => task._id !== taskId),
                        };
                    }
                    return column;
                });

                return {
                    ...prevBoard,
                    columns: updatedColumns,
                };
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <BoardContext.Provider
            value={{ boards, board, loading, error, updateTaskAndMove, removeBoard, setBoard, fetchBoards, fetchBoard, addBoard, addTask, updateTask, deleteTask }}
        >
            {children}
        </BoardContext.Provider>
    );
};
