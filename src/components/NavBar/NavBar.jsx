
import { useState } from 'react'
import { useParams, Link, useLocation, useNavigate} from 'react-router-dom'
import styles from './NavBar.module.css'
import Logo from '../../assets/logo-mobile.svg'
import Button from '../Button/Button'
import addTaskIcon from '../../assets/icon-add-task-mobile.svg'
import menu from '../../assets/icon-vertical-ellipsis.svg'
import arrowDown from '../../assets/icon-chevron-down.svg'
import MenuModal from '../MenuModal/MenuModal'




const NavBar = ({ title, data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const disabled = !data ? true : false;
    return (
        <nav className={styles.container}>
            <div className={styles.logoWrapper} onClick={() => navigate('/')}>
                <img src={Logo} alt="logo" />
                <h1>Kanban</h1>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.headWrapper}>
                    <h1>{title}</h1>
                    {data && <img className={styles.cursorPointer} src={arrowDown} alt="logo" />}
                </div>
                <div className={styles.buttonsWrapper}>
                    <Button variant="primary" disabled={disabled}>
                        <img src={addTaskIcon} alt="add task icon" />
                        <Link to={`/boards/${id}/task`} state={{ backgroundLocation: location }}>
                            <span className={styles.btnText}>Add New Task</span>
                        </Link>
                    </Button>
                    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant='editButton' disabled={disabled} >
                        <img className={styles.cursorPointerMenu} src={menu} alt="menu" />
                    </Button>
                    {isMenuOpen && <MenuModal remove={setIsMenuOpen} />}
                </div>
            </div>

        </nav>
    )
}

export default NavBar