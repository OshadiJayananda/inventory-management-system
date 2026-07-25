import { NavLink } from "react-router-dom";

const Navigation = () => {
  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return `block rounded-lg px-4 py-3 ${
      isActive
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;
  };

  return (
    <nav className="space-y-2">
      <NavLink to="/dashboard" className={getLinkClassName}>
        Dashboard
      </NavLink>

      <NavLink to="/products" className={getLinkClassName}>
        Products
      </NavLink>

      <NavLink to="/stock-history" className={getLinkClassName}>
        Stock History
      </NavLink>

      <NavLink to="/categories" className={getLinkClassName}>
        Categories
      </NavLink>
    </nav>
  );
};

export default Navigation;
