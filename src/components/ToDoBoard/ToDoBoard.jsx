import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import styles from './ToDoBoard.module.css'
import addColumn from '../../assets/icon-add-task-mobile.svg'
import Modal from '../Modal/Modal'
import Column from '../Column/Column'
import { useBoard } from '../../context/BoardContext'
import { useParams } from 'react-router-dom'



const ToDoBoard = () => {
    const { id } = useParams();
    const { board, fetchBoard, boards } = useBoard();
    const [openModal, setOpenModal] = useState(false);
    console.log(board);

    useEffect(() => {
        console.log(id)
        if (id) {
            fetchBoard(id)
        }
    }, [id]);

    return (
        <>
            {board && boards?.length > 0 ? <div className={styles.columnContainer}>
                {board.columns?.map((column) => (
                    <Column key={column._id} column={column} columnID={column._id}/>))}
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