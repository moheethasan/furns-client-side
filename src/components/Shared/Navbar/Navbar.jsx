import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../../public/icon.png";
import { FaUserCircle } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

const Navbar = () => {
  const user = true;
  const isAdmin = false;
  const location = useLocation();
  const isHomeLoginRegister =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  const navOptions = (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "default")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "default")}
        to="/products"
      >
        Products
      </NavLink>
      {user && isAdmin ? (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "default")}
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      ) : (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "default")}
          to="/cart"
        >
          Cart
        </NavLink>
      )}
    </>
  );

  return (
    <nav
      className={`bg-white bg-opacity-100 w-full py-4 md:py-6 z-20 ${
        isHomeLoginRegister ? "fixed z-10 bg-opacity-30" : ""
      }`}
    >
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden text-orange-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 px-4 py-3 shadow bg-black rounded-lg bg-opacity-70 w-40"
            >
              {navOptions}
            </ul>
          </div>
          <img className="w-28 md:w-32 lg:w-40" src={logo} alt="logo" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 md:gap-5">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex gap-2 md:gap-3 items-center">
              <div
                className="tooltip tooltip-bottom"
                data-tip={
                  user.displayName ? user.displayName : "name not found"
                }
              >
                {user.photoURL ? (
                  <img
                    className="w-8 md:w-12 h-8 md:h-12 rounded-full"
                    src={user.photoURL}
                    alt="user photo"
                  />
                ) : (
                  <FaUserCircle className="text-black text-3xl md:text-4xl" />
                )}
              </div>
              <button className="btn-secondary">Logout</button>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn-secondary flex gap-2 items-center">
                Login <HiArrowLongRight className="text-2xl" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;