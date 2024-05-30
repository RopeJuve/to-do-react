import { Routes, Route, useLocation } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import DefaultBoard from './pages/DefaultBoard';
import Modal from './components/Modal/Modal';
import { BoardProvider } from './context/BoardContext';
import EmptyBoardPage from './pages/EmptyBoardPage';


function App() {
  const location = useLocation();
  const state = location.state;

  return (
    <BoardProvider>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<DefaultBoard />} />
        <Route path='boards/new' element={<EmptyBoardPage />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/boards/:boardId/task" element={<Modal variant="addTask" />} />
          <Route path="/boards/:boardId/column/:columnId/task/:taskId/edit-task" element={<Modal variant="editTask" />} />
        </Routes>
      )}
    </BoardProvider>
  );
}


export default App
