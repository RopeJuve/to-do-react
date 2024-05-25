import { Routes, Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import DefaultBoard from './pages/DefaultBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultBoard />} />
      <Route path="/boards/:id" element={<BoardPage />} />
    </Routes>

  )
}

export default App
