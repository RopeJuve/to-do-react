import { useState } from 'react'
import Button from '../Button/Button'
import styles from './ToDoBoard.module.css'
import addColumn from '../../assets/icon-add-task-mobile.svg'
import Modal from '../Modal/Modal'

const ToDoBoard = ({ board }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            {!!board ? <div className={styles.columnContainer}>
                {board.columns.map((column) => (
                    <div key={column._id}>{column.title}</div>))}
            </div> : <div className={styles.emptyContainer}>
                <p>You haven't created board yet!!</p>
                <Button variant="primary" onClick={() => setOpenModal(true)}>
                    <img src={addColumn} alt="addIcon" />
                    Add New Board
                </Button>
                {openModal && <Modal variant="addBoard" remove={() => setOpenModal(false)} />}
            </div>}
        </>
    )
}

export default ToDoBoard