import React from "react";
import classes from "./CenteredContainer.module.css";
const CenteredContainer = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default CenteredContainer;
