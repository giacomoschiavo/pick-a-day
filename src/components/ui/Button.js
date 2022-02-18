import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div
      className={`${props.className} ${classes.btn} ${
        props.isPrimary === false && classes.secondary
      }`}
      onClick={props.onClick}
    >
      {props.children || props.value}
    </div>
  );
};

export default Button;
