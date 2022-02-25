import React from "react";
import classes from "./Header.module.css";
import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <div className={classes.header}>
      <img src={logo} alt="pick-a-day-logo" />
    </div>
  );
};

export default Header;
