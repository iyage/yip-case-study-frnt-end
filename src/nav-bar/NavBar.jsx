import React from "react";
import "./nav-bar.scss";
import { FaAlignJustify } from "react-icons/fa6";
function NavBar({ setHideSideBar }) {
  return (
    <nav>
      <div className="wrapper">
        <FaAlignJustify className="menu" onClick={() => setHideSideBar(true)} />
      </div>
    </nav>
  );
}

export default NavBar;
