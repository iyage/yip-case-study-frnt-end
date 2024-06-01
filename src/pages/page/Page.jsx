import { Navigate } from "react-router-dom";
import MapComp from "./map-component/MapComp";
import "./page.scss";
import NavBar from "../../nav-bar/NavBar";
import SideBar from "../../side-bar/SideBar";
import { useState } from "react";
function Page() {
  const [hideSideBar, setHideSideBar] = useState(false);
  return sessionStorage.getItem("auth") ? (
    <div className="page-container">
      {hideSideBar && <SideBar setHideSideBar={setHideSideBar} />}
      <NavBar setHideSideBar={setHideSideBar} />
      <div className="wrapper">
        <div className="page-card">
          <MapComp />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}

export default Page;
