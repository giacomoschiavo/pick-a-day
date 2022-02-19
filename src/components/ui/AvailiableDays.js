import React from "react";
import classes from "./AvailableDays.module.css";
import Label from "./Label";
import Day from "./Day";

const AvailableDays = () => {
  return <div className={classes.container}>
    <Label>April</Label>
    <Day>1</Day>
  </div>;

};

export default AvailableDays;
