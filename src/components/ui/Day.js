import React from "react";
import classes from "./Day.module.css";

const Day = (props) => {
  return <div className={props.isSelected ? classes.containerPressed : classes.container}>
    <p>{props.children}</p>
  </div>;

};

export default Day;
