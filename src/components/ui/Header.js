import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <img src="./logo.png" alt="pick-a-day-logo" />
    </div>
  );
};

export default Header;
