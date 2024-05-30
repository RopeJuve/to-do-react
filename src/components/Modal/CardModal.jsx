import React, { useState } from 'react';
import styles from './CardModal.module.css';
import dots from '../../assets/icon-vertical-ellipsis.svg';
import Button from '../Button/Button';
import { useBoard } from '../../context/BoardContext';
import { Link, useParams, useLocation } from 'react-router-dom';

const CardModal = ({ task, onClose, columnID }) => {
    const location = useLocation();
    console.log(location)
    const { id } = useParams();
    const { title, taskDescription, status, subtasks, _id } = task;
    const { deleteTask } = useBoard();
    const [menuVisible, setMenuVisible] = useState(false);
    const completedSubTasks = subtasks ? subtasks.filter((subTask) => subTask.isCompleted).length : 0;
    const numSubtasks = subtasks ? subtasks.length : 0;

    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    const handleDeleteTask = async () => {
        console.log(id, columnID, _id);
        await deleteTask(id, columnID, _id);
        onClose(); // Close the modal after deleting the task
    };

    const handleCheckboxChange = (e, subtaskId) => {
        // Handle checkbox change
    };

    return (
        <>
            <div id="card-modal" data-task-id={_id} className={styles.cardModal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalTitle}>{title}</h1>
                        <div className={styles.headerContainer}>
                            <img
                                className={styles.menu}
                                src={dots}
                                alt="dots"
                                onClick={handleMenuToggle}
                            />
                            {menuVisible && (
                                <div className={styles.menuContent}>
                                    <Button variant='editButton' onClick={onClose}>
                                        <Link to={`/boards/${id}/column/${columnID}/task/${task._id}/edit-task`} state={{ backgroundLocation: location }}>Edit Task</Link>
                                    </Button>
                                    <Button variant='deleteButton' onClick={handleDeleteTask}>Delete Task</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className={styles.modalDescription}>{taskDescription}</p>
                    <div className={styles.subtaskContainer}>
                        <h6>Subtasks ({completedSubTasks} of {numSubtasks})</h6>
                        <div className={styles.subtasks}>
                            {subtasks?.map((subtask) => (
                                <div key={subtask._id} className={styles.subtask}>
                                    <input
                                        id={subtask._id}
                                        className={styles.checkbox}
                                        type="checkbox"
                                        checked={subtask?.isCompleted}
                                        onChange={(e) => handleCheckboxChange(e, subtask._id)}
                                    />
                                    <p className={subtask?.isCompleted ? styles.completed : ''}>
                                        {subtask.subtaskDescription}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.statusContainer}>
                        <h6>Current Status</h6>
                        <p className={styles.status}>{status}</p>
                    </div>
                    <Button variant='primary' onClick={onClose}>Close</Button>
                </div>
            </div>
        </>
    );
};

export default CardModal;
