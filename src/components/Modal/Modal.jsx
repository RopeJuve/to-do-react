import styles from './Modal.module.css'
import AddBoardModal from './AddBoardModal'
import AddTaskModal from './AddTaskModal';
import { useNavigate } from 'react-router-dom';

const Modal = ({ remove, variant }) => {
    const navigate = useNavigate();
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    const handleClick = () => {
        if (variant === 'addTask') {
            navigate(-1);
        } else {
            remove();
        }
    }
    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.modal} onClick={handleModalClick}>
                {variant === 'addBoard' && <AddBoardModal remove={remove} />}
                {variant === 'addTask' && <AddTaskModal />}
            </div>
        </div>
    )
}

export default Modal