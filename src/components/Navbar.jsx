import { Link } from "react-router-dom"; 
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-green-700">Civi</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
        <button className="btn btn-primary">DaisyUI Test</button>
          <li><Link to="/">Home</Link></li>
          <li><Link to="">Jobs</Link></li>
          <li><Link to="">Companies</Link></li>
        </ul>
        <div className="ml-4 bg-black flex gap-2">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/post-job" className="btn btn-success rounded-full">Post a Job</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
