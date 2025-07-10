import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import './styles/App.css';
import MoviePage from './pages/MoviePage';
import Layout from './pages/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
