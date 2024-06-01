import React from "react";
import "./side-bar.scss";
import { useNavigate } from "react-router-dom";
function SideBar({ setHideSideBar }) {
  const navigate = useNavigate();
  function handleLogOut() {
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <div className="side-bar" onClick={() => setHideSideBar(false)}>
      <div className="side-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="btn-container">
          <button onClick={handleLogOut}>LogOut</button>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
