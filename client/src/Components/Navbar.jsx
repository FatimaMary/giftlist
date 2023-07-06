import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import "../App.css";


export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleClick = () => {
    navigate("/login");
  }

  return (<div>
    <nav className={!toggle ? "navbar expanded" : "navbar"}>
      <div className="toggle-icon">
        <b>GIFT</b>LIST
      </div>
      <ul className="links">
        <li onClick={handleClick} className="login" >
          Login
        </li>
        <li onClick={() => navigate("/signup")} className="signup">Sign up</li>
      </ul>
      {/* <div className="menu-icon" onClick={handleToggle}>
          {toggle ? (
            <Icon icon={x} size={24} />
          ) : (
            <Icon icon={menu} size={24} />
          )}
        </div> */}
    </nav>
    <Outlet />
    </div>
  );
};

export default Navbar;

// {toggle && (
//   <ul className="dropdown">
//     <li onClick={handleClick} className="dropdown-item">
//       Login
//     </li>
//     <li onClick={() => navigate("/signup")} className="dropdown-item">
//       Sign up
//     </li>
//   </ul>
// )}