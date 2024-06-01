import { Route, Routes } from "react-router-dom";
import Page from "./pages/page/Page";
import Login from "./pages/login/Login";
import NotFound from "./pages/not-found/NotFound";
import SignUp from "./pages/sign-up/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/page" element={<Page />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
