import styles from './Column.module.css'

const Column = ({ column }) => {
    const { title, tasks } = column;
    const bgColor = {
        'To Do': '#49C4E5',
        'In Progress': '#8471F2',
        'Done': '#67E2AE'
    };
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.circle} style={{ backgroundColor: `${bgColor[title]}` }}></div>
                <h3>{title}</h3>
            </div>
            <div className={styles.taskWrapper}>
                {tasks.map((task) => (
                    <div key={task._id} className={styles.task}>
                        <p>{task.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Column