import { useState } from 'react';
import styles from './CardModal.module.css';
import dots from '../../assets/icon-vertical-ellipsis.svg';
import Button from '../Button/Button';


const CardModal = ({ task, onClose }) => {
    const { title, taskDescription, status, subTasks, _id } = task;
    console.log(task)
    const [menuVisible, setMenuVisible] = useState(false);
    const completedSubTasks = subTasks ? subTasks.filter((subTask) => subTask.isCompleted).length : 0;
    const numSubtasks = subTasks ? subTasks.length : 0;
    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    const handleDeleteTask = () => {

    };

    const handleEditTask = () => {

    };

    const handleCheckboxChange = () => {

    };

    return (
        <div id="card-modal" data-modal-id={_id} className={styles.cardModal}>
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
                                <button onClick={handleEditTask}>Edit Task</button>
                                <button onClick={handleDeleteTask}>Delete Task</button>
                            </div>
                        )}
                    </div>
                </div>
                <p className={styles.modalDescription}>{taskDescription}</p>
                <div className={styles.subtaskContainer}>
                    <h6>Subtasks ({completedSubTasks} of {numSubtasks})</h6>
                    <div className={styles.subtasks}>
                        {subTasks?.map((subtask) => (
                            <div key={subtask._id} className={styles.subtask}>
                                <input
                                    id={subtask._id}
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={subtask?.isCompleted}
                                    onChange={(e) => handleCheckboxChange(e, subtask.id)}
                                />
                                <p className={subtask?.isCompleted ? styles.completed : ''}>{subtask.title}</p>
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
    );
};

export default CardModal;