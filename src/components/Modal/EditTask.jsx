import { useEffect, useState } from 'react';
import styles from './AddTaskModal.module.css'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useBoard } from '../../context/BoardContext';
import deleteInput from '../../assets/icon-cross.svg'

const EditTask = () => {
    const { boardId, columnId, taskId } = useParams();
    const navigate = useNavigate();
    const { updateTask, getTask, task, fetchBoard } = useBoard();
    const [numInputs, setNumInputs] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [formData, setFormData] = useState({
        title: task?.title,
        taskDescription: task?.taskDescription,
        subtasks: task?.subtasks || subtasks,
        isCompleted: false,
        status: task?.status
    });

    useEffect(() => {
        getTask(boardId, columnId, taskId);
        return () => {
            fetchBoard(boardId);
        }
    }, [boardId, columnId, taskId])


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'subtasks') {
            const newSubtasks = [...subtasks];
            newSubtasks[index] = { subtaskDescription: value, isCompleted: false };
            setSubtasks(newSubtasks);
            setFormData({ ...formData, subtasks: newSubtasks });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        if (formData.status !== task.status) {
            await updateTask(boardId, columnId, task?._id, { task: formData, newColumnTitle: formData.status });
            navigate(`/boards/${boardId}`);
        } else {
            await updateTask(boardId, columnId, task?._id, { task: formData });
            navigate(`/boards/${boardId}`);
        }

    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1>Edit Task</h1>
            <div className={styles.content}>
                <label htmlFor="title">Title</label>
                <Input id='title' name='title' type='text' placeholder="Task title" onChange={handleInputChange} value={formData?.title} />
            </div>
            <div className={styles.content}>
                <label htmlFor="taskDescription">Description</label>
                <textarea value={formData?.taskDescription} id='taskDescription' name='taskDescription' className={styles.textArea} rows="4" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." onChange={handleInputChange} />
            </div>
            <div className={styles.content}>
                <label htmlFor="title">Subtasks</label>

                {task?.subtasks?.map((subtask, index) => (
                    <div className={styles.subtaskInput}>
                        <Input key={subtask?._id} id='subtasks' name='subtasks' type='text' placeholder="e.g. Take coffee break" value={formData?.subtasks[index]?.subtaskDescription} onChange={(e) => handleInputChange(e, index)} />
                        <Button key={`btn-${subtask._id}`} type='button' variant="inActive" >
                            <img src={deleteInput} alt="delete subtask input" />
                        </Button>
                    </div>
                ))}
                {numInputs.map((input, index) => (
                    <div className={styles.subtaskInput}>
                        <Input key={input} id='subtasks' name='subtasks' type='text' placeholder="e.g. Take coffee break" onChange={(e) => handleInputChange(e, index)} />
                        <Button key={`btn-${input}`} type='button' variant="inActive" onClick={() => setNumInputs(prev => prev.filter(num => num !== input))
                        }>
                            <img src={deleteInput} alt="delete subtask input" />
                        </Button>
                    </div>
                ))}
                <Button type='button' variant="secondary" onClick={() => setNumInputs(prev => [...prev, prev.length + 1])}>+ Add Subtask</Button>
            </div>
            <div className={styles.content}>
                <span>Status</span>
                <select selected name='status' className={styles.selectContainer} type='text' onChange={handleInputChange} value={formData?.status}>
                    <option value='To Do'>To Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
            </div>
            <Button type='submit' variant="primary">Update Task</Button>
        </form>
    )
}


export default EditTask