import React from "react";
import { NavLink } from "react-router-dom";

import ImgLogo from "../../assets/JSW-logo.png";
import ImgMenu from "../../assets/menu.jpg";
import ImgUser from "../../assets/user-pic.jpg";
import ImgArrowDown from "../../assets/arrow-down.jpg";

import "./Header.css";

function Header(props) {
  return (
    <header className={`header flex ${props.navOpen}`}>
      <div className="left flex">
        <button className="menu" onClick={props.onMenuClick}>
          <img className="lines" src={ImgMenu} alt="Menu Button" />
          <img className="arrow" src={ImgArrowDown} alt="Menu Button" />
        </button>
        <NavLink to="/dashboard" className="logo">
          <img src={ImgLogo} alt="JSW | Vijayanagar" />
        </NavLink>
      </div>
      <div className="right flex">
        
      <div className = "user flex"> <img className="pic" src={ImgUser} alt="John Doe" /> </div>
          <div className="user-name">{localStorage.getItem('user_name')}</div>
          <NavLink onClick={props.onLogOut} to="/login" className="user flex">
          <button className="button-logout"
           > Logout </button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
