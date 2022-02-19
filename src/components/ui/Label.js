import React from "react";
import classes from "./Label.module.css";
const Label = (props) => {
  return (
    <p className={`${props.className} ${classes.label}`}>{props.children}</p>
  );
};

export default Label;
