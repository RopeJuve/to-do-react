import { useState } from 'react'
import styles from './AddTaskModal.module.css'
import Button from "../Button/Button"
import Input from "../Input/Input"
import deleteInput from '../../assets/icon-cross.svg'
import { useNavigate, useParams } from 'react-router-dom'

const AddTaskModal = () => {
    const navigate = useNavigate();
    const { boardId } = useParams();
    const [numInputs, setNumInputs] = useState([1]);
    const [subtasks, setSubtasks] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        taskDescription: '',
        subtasks: subtasks,
        isCompleted: false,
        status: 'To Do'
    });
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
        const response = await fetch(`http://localhost:3000/api/boards/${boardId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
        navigate(`/boards/${boardId}`);
    }
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1>Add New Task</h1>
            <div className={styles.content}>
                <label htmlFor="title">Title</label>
                <Input id='title' name='title' type='text' placeholder="Task title" onChange={handleInputChange} />
            </div>
            <div className={styles.content}>
                <label htmlFor="taskDescription">Description</label>
                <textarea id='taskDescription' name='taskDescription' className={styles.textArea} rows="4" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." onChange={handleInputChange} />
            </div>
            <div className={styles.content}>
                <label htmlFor="title">Subtasks</label>

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
                <select name='status' className={styles.selectContainer} type='text' onChange={handleInputChange} value={formData.status}>
                    <option value='To Do'>To Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
            </div>
            <Button type='submit' variant="primary">Add Task</Button>
        </form>
    )
}

export default AddTaskModal