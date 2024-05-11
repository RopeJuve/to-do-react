import  { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import ToDoBoard from './components/ToDoBoard/ToDoBoard'

function App() {
  const boards = [];
  const [selectedBoard, setSelectedBoard] = useState(boards[0]  || null);
  const title = selectedBoard ? selectedBoard.title : 'Kanban Board';

  return (
    <>
      <NavBar title={title} data={selectedBoard}/>
      <ToDoBoard />
    </>
  )
}

export default App
