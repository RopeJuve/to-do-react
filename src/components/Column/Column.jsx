
import Card from '../Card/Card';
import styles from './Column.module.css'

const Column = ({ column, columnID}) => {

    const bgColor = {
        'To Do': '#49C4E5',
        'In Progress': '#8471F2',
        'Done': '#67E2AE'
    };
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.circle} style={{ backgroundColor: `${bgColor[column?.title]}` }}></div>
                <h3>{column?.title}</h3>
            </div>
            <div className={styles.taskWrapper}>
                {column?.tasks?.map((task) => (
                    <Card key={task._id} task={task} columnID={columnID}/>
                ))}
            </div>
        </div>
    )
}

export default Column