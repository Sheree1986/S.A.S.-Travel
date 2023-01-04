import "./btn-profile.css";
// import { Routes } from "./routes/Routes";
// import { Route } from "react-router-dom";

// import  Login  from "../pages/Login";
import { useNavigate } from "react-router-dom";
// import {Link} from "react-router-dom"

function BtnProfile() {
  let navigate = useNavigate();
  return (
    <>
      <div className="group-btn">
        <div className="login-btn-wrapper">{/* </Link> */}</div>
        <div className="register-btn-wrapper">
          <button
            className="add"
            id="add-btn"
            onClick={() => {
              navigate("/add-post");
            }}
          >
            <span className="btn--anim1"></span>
            <span className="btn--anim1"></span>
            <span className="btn--anim1"></span>
            <span className="btn--anim1"></span>
            ADD POST
          </button>
        </div>
      </div>
    </>
  );
}
export default BtnProfile;
