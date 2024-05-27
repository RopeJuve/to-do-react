import { Routes, Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import DefaultBoard from './pages/DefaultBoard';
import Modal from './components/Modal/Modal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultBoard />} />
      <Route path="/boards/:id" element={<BoardPage />} />
      <Route path='/boards/:boardId/task' element={<Modal variant='addTask' />} />
    </Routes>

  )
}

export default App
