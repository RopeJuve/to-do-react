import Button from '../Button/Button'
import styles from './MenuModal.module.css'
import { useState } from 'react'
import Modal from '../Modal/Modal'

const MenuModal = ({ remove }) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const handleRemove = () => {
        setIsOpenEdit(false);
        remove(false);
    }
    return (
        <div className={styles.container}>
            <Button onClick={() => setIsOpenEdit(!isOpenEdit)} variant='editButton'>Edit Board</Button>
            <Button variant='deleteButton'>Delete Board</Button>
            {isOpenEdit && <Modal variant='addBoard' remove={handleRemove} />}
        </div>
    )
}

export default MenuModal