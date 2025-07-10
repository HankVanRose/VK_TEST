import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import './styles/App.css';
import MoviePage from './pages/MoviePage';
import Layout from './pages/Layout';
import Registration from './pages/Registration';
import Login from './pages/LogIn';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
           <Route path="/register" element={<Registration />} />
           <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
