import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";

import Footer from "../layout/Footer";
import TopBar from "../home/TopBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar></TopBar>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
