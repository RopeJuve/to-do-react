import styles from './Modal.module.css'
import AddBoardModal from './AddBoardModal'

const Modal = ({ remove, variant }) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.container} onClick={remove}>
            <div className={styles.modal} onClick={handleModalClick}>
                {variant === 'addBoard' && <AddBoardModal />}
            </div>
        </div>
    )
}

export default Modal