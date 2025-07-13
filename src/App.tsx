import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import './styles/App.css';
 
import Layout from './pages/Layout';
import Registration from './pages/Registration';
import Login from './pages/LogIn';
import Page404 from './pages/Page404';
import FavoritesPage from './pages/FavoritesPage';
import { MoviePage } from './pages/MoviePage';
 

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
