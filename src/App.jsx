import { useState, useEffect } from 'react'
import NavBar from './components/NavBar/NavBar'
import ToDoBoard from './components/ToDoBoard/ToDoBoard'
import SideBar from './components/SideBar/SideBar'

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(boards[0] || null);
  const title = selectedBoard ? selectedBoard.title : 'Kanban Board';

  useEffect(() => {
    const getBoards = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/boards');
        const data = await response.json();
        setBoards(data);
        setSelectedBoard(data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    getBoards();
  }, [])
  console.log(boards)

  const handelSelectedBoard = (index) => {
    setSelectedBoard(boards[index]);
  }
  return (
    <>
      <NavBar title={title} data={selectedBoard} />
      <SideBar boards={boards} selected={selectedBoard} setSelectedBoard={handelSelectedBoard} />
      <ToDoBoard />
    </>
  )
}

export default App
