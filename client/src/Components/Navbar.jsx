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
  };

  return (
    <div>
      <nav className={!toggle ? "navbar expanded" : "navbar"}>
        <div className="toggle-icon">
          <b>GIFT</b>NOTE
        </div>
        <ul className="links">
          <li onClick={handleClick} className="login">
            Login
          </li>
          <li onClick={() => navigate("/signup")} className="signup">
            Sign up
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
