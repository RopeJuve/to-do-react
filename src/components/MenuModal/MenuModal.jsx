import Button from '../Button/Button'
import styles from './MenuModal.module.css'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { deleteBoard } from '../../services/deleteBoard.js'

const MenuModal = ({ remove }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const handleRemove = () => {
        setIsOpenEdit(false);
        remove(false);
    }

    const handleDeleteBoard = async (id) => {
        await deleteBoard(id);
        navigate('/')
        remove();
    }
    return (
        <div className={styles.container}>
            <Button onClick={() => setIsOpenEdit(!isOpenEdit)} variant='editButton'>Edit Board</Button>
            <Button variant='deleteButton' onClick={() => handleDeleteBoard(id)}>Delete Board</Button>
            {isOpenEdit && <Modal variant='addBoard' remove={handleRemove} />}
        </div>
    )
}

export default MenuModal