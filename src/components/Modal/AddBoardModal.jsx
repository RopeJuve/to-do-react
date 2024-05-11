import styles from "./AddBoardModal.module.css"
import Button from "../Button/Button"
import Input from "../Input/Input"


const AddBoardModal = () => {
    return (
        <div className={styles.container}>
            <h2>Add New Board</h2>
            <div className={styles.addBoardTitleWrapper}>
                <label htmlFor="board-title">Board Name</label>
                <Input name="board-title" type="text" placeholder="Enter board title" />
            </div>
            <div className={styles.addBoardTitleWrapper}>
                <label htmlFor="board-title">Board Columns</label>
                <Input name="board-title" type="text" placeholder="Enter board title" value='Todo' />
                <Input name="board-title" type="text" placeholder="Enter board title" value='Progress' />
                <Input name="board-title" type="text" placeholder="Enter board title" value='Done' />
            </div>
            <Button variant='primary'>Create Board</Button>
        </div>
    )
}

export default AddBoardModal