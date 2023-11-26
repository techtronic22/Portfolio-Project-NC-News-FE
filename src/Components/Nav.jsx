import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <ul className={`navbar ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/home" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/articles" onClick={toggleMenu}>
            Articles
          </Link>
        </li>
        <li>
          <Link to="/topics" onClick={toggleMenu}>
            Topics
          </Link>
        </li>
        {/* <li>
          <Link to="/users" onClick={toggleMenu}>
            Users
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
