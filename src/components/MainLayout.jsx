import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // adjust path if needed
import Hero from './Hero';
import Footer from './Footer';
import TopBar from './TopBar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar></TopBar>
      <Navbar />
      
      <main className="p-6">
        <Outlet />
      </main>
        <Footer></Footer>
    </div>
  );
};

export default MainLayout;
