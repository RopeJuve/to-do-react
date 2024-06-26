import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button'
import ThemeContainer from '../ThemeContainer/ThemeContainer'
import styles from './SideBar.module.css'
import Modal from '../Modal/Modal';
import { useBoard } from '../../context/BoardContext';

const SideBar = () => {
  const navigate = useNavigate();
  const { boards, fetchBoards, board, setBoard } = useBoard();
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    fetchBoards();
  }, []);


  const handleClick = (index, id) => {
    navigate(`/boards/${id}`);
    setBoard(boards[index]);
  }
  return (
    <aside className={styles.container}>
      <div className={styles.top}>
        <h4> all boards ({boards?.length})</h4>
        {boards?.map((item, index) => {
          return (
            board.title === item.title ? (
              <Button key={item._id} variant="aside" onClick={() => handleClick(index, item._id)}>
                <svg
                  className={styles.icon}
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill=""
                  />
                </svg>
                {item.title}
              </Button>
            ) : (
              <Button key={item._id} variant="inActive" onClick={() => handleClick(index, item._id)} >
                <svg
                  className={styles.iconInActive}
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill=""
                  />
                </svg>
                {item.title}
              </Button>
            )
          )
        }
        )}
        <Button variant="createBoard" onClick={() => setOpenModal(true)}>
          <svg
            className={styles.createBoardIcon}
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill=""
            />
          </svg>
          + Create New Board
        </Button>
      </div>
      <div className={styles.bottom}>
        <ThemeContainer checked={true} />
        <Button variant="inActive">
          <svg width="18" height="16"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" fill="#828FA3" />
          </svg>
          Hide Sidebar
        </Button>
      </div>
      {openModal && <Modal variant="addBoard" remove={() => setOpenModal(false)} />}
    </aside>
  )
}

export default SideBar