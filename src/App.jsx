import "./App.css";
// import Navbar from "./components/Navbar";
// import Container from "./components/Container";
import Recomandations from "./pages/Recomandations";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recomandations" element={<Recomandations />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
