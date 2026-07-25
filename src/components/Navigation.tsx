import { NavLink } from "react-router-dom";

type NavigationProps = {
  onNavigate?: () => void;
};

const Navigation = ({ onNavigate }: NavigationProps) => {
  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return `block rounded-lg px-4 py-3 ${
      isActive
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;
  };

  return (
    <nav className="space-y-2">
      <NavLink to="/dashboard" className={getLinkClassName} onClick={onNavigate}>
        Dashboard
      </NavLink>

      <NavLink to="/products" className={getLinkClassName} onClick={onNavigate}>
        Products
      </NavLink>

      <NavLink to="/stock-history" className={getLinkClassName} onClick={onNavigate}>
        Stock History
      </NavLink>

      <NavLink to="/categories" className={getLinkClassName} onClick={onNavigate}>
        Categories
      </NavLink>
    </nav>
  );
};

export default Navigation;
