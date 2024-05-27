import { useState } from 'react';
import styles from './Card.module.css'
import CardModal from '../Modal/CardModal';

const Card = ({ task }) => {
    const { title, _id, subtasks } = task;
    const [modalVisible, setModalVisible] = useState(false);
    console.log(subtasks)
    const completedSubTasks = subtasks ? subtasks.filter((subTask) => subTask.isCompleted).length : 0;

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', _id);
        console.log('dragstart', _id);
    };

    const handleDragEnd = () => {
        console.log('dragend', _id);
    };

    return (
        <>
            <div
                data-id={_id}
                className={styles.card}
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => setModalVisible(true)}
            >
                <h2 className={styles.cardTittle}>{title}</h2>
                <span className={styles.cardSubtasks}>{completedSubTasks} of {subtasks ? subtasks?.length : 0} subtasks</span>
                {/* Assuming createDropZone() returns a React element */}
            </div>
            {modalVisible && <CardModal task={task} onClose={() => setModalVisible(false)} />}
        </>
    );
};

export default Card;