import Header from '../components/Header/Header';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}
