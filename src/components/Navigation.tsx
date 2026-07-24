import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/dashboard">Dashboard</NavLink>

      <NavLink to="/products">Products</NavLink>

      <NavLink to="/categories">Categories</NavLink>
    </nav>
  );
};

export default Navigation;
