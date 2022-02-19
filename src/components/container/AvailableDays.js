import React from "react";
import classes from "./AvailableDays.module.css";
import Label from "../ui/Label";
import Day from "../ui/Day";

const AvailableDays = () => {
  return (
    <div className={classes.container}>
      <Label className={classes.label}>April</Label>
      <div className={classes.days}>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
      </div>
      <Label className={classes.label}>May</Label>
      <div className={classes.days}>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
        <Day>1</Day>
      </div>
    </div>
  );
};

export default AvailableDays;
