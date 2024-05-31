import { Route, Routes } from "react-router-dom";
import Page from "./pages/page/Page";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </>
  );
}

export default App;
