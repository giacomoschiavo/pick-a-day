import React from "react";
import Label from "../ui/Label";
import classes from "./Section.module.css";
const Section = (props) => {
  return (
    <div className={`${props.className} ${classes.container}`}>
      <Label className={classes.label}>{props.label}</Label>
      {props.children}
    </div>
  );
};

export default Section;
