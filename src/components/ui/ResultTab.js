import React from "react";
import { BsCheckLg } from "react-icons/bs";
import classes from "./ResultTab.module.css";
const ResultTab = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        <BsCheckLg />
      </div>
      <p>{props.date || "12-09-22"}</p>
      <div className={classes.participants}>
        <p>9/9</p>
      </div>
    </div>
  );
};

export default ResultTab;
