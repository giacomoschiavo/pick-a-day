import React from "react";
import { Colors } from "../../utils";
import classes from "./CenteredContainer.module.css";
const CenteredContainer = (props) => {
  return (
    <div
      className={classes.container}
      style={{ backgroundColor: Colors.white }}
    >
      {props.children}
    </div>
  );
};

export default CenteredContainer;
