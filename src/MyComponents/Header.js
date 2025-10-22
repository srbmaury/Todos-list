import React, {useEffect} from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header(props) {
  const changeClass = (name) => {
    document.getElementById('home').className = "nav-link";
    document.getElementById('about').className = "nav-link";
    document.getElementById(name).className = "nav-link active";
  }

  useEffect(() => {
    if(window.location.href.endsWith('about')) changeClass('about');
  }, [props])
  
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link id="home" onClick = {() => changeClass('home')} className="nav-link active" aria-current="page" to="/Todos-list">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link id="about" onClick = {() => changeClass('about')} className="nav-link" to="Todos-list/about">
                About
              </Link>
            </li>
          </ul>
          {props.searchBar && (
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
          {/* Dark Mode Toggle Button */}
          <button
            className="theme-toggle ms-3"
            onClick={props.toggleDarkMode}
            aria-label="Toggle dark mode"
            title={props.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {props.isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  title: "Your Title Here",
  isDarkMode: false,
  toggleDarkMode: () => {},
};
Header.propTypes = {
  title: ProtoTypes.string,
  searchBar: ProtoTypes.bool.isRequired,
  isDarkMode: ProtoTypes.bool,
  toggleDarkMode: ProtoTypes.func,
};
