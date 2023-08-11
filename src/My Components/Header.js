import React from "react";
import "./Header.css";
import propTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function Header({ title, search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        {title}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/About">
              about
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Deleted">
              deleted
            </Link>
          </li>
        </ul>

        {search ? (
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            onClick={logoutOfApp}
          >
            LogOut
          </button>
        ) : (
          "no search"
        )}
      </div>
    </nav>
  );
}

Header.defaultProps = {
  title: "your title here",
  search: true,
};

Header.propTypes = {
  title: propTypes.string,
  search: propTypes.bool.isRequired,
};

export default Header;
