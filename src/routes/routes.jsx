import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
// import Navbar from '../components/Navbar';


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* <Route path="/home" element={<div>Hello world!</div>} /> */}
      <Route path="/" element={<Home/>} />
      {/* <Route path="/nav" element={<Navbar/>} /> */}
      
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
