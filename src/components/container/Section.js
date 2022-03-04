import React from "react";
import Label from "../ui/Label";
import classes from "./Section.module.css";
const Section = (props) => {
  console.log("Section.js re-rendered con ", props.label);
  return (
    <div className={`${props.className} ${classes.container}`}>
      <Label className={classes.label} sub={props.sub}>
        {props.label}
      </Label>
      {props.children}
    </div>
  );
};

export default React.memo(Section);
