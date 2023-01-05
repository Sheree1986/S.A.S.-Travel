// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import "./App.css"
// import Typography from '@mui/material/Typography';
import Recomandations from "./pages/Recomandations";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Login from "./components/Login";
// import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import AddPost from "./pages/AddPost";
import ViewAdminPost from "./pages/ViewAdminPost";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      {/* <AdminDashboard /> */}
      {/* <Home/>  */}
      {/* <Navbar /> */}

    <Routes>
        <Route path="/recomandations" element={<Recomandations />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ViewAdminPost/>} />
        <Route path="/post" element={<SinglePost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
