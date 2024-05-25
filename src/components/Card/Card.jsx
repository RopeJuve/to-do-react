import styles from './Card.module.css'

const Card = ({ task }) => {
    const { title, _id, subTasks } = task;

    const completedSubTasks = subTasks?.filter((subTask) => subTask.content.isCompleted).length;

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', _id);
        console.log('dragstart', _id);
    };

    const handleDragEnd = () => {
        console.log('dragend', _id);
    };

    return (
        <div
            data-id={_id}
            className={styles.card}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <h2 className={styles.cardTittle}>{title}</h2>
            <span className={styles.cardSubtasks}>{completedSubTasks} of {subTasks?.length} subtasks</span>
            {/* Assuming createDropZone() returns a React element */}
        </div>
    );
};

export default Card;