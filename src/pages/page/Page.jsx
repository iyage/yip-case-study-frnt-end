import { Navigate } from "react-router-dom";
import MapComp from "./map-component/MapComp";
import "./page.scss";
function Page() {
  return sessionStorage.getItem("auth") ? (
    <div className="page-container">
      <div className="page-card">
        <MapComp />
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}

export default Page;
