import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Hello world!</div>} />
      <Route path="/home" element={<Home/>} />
      
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
