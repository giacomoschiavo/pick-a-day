import React from "react";
import Label from "../ui/Label";
import ResultTab from "../ui/ResultTab";
import classes from "./Results.module.css";
const Results = () => {
  return (
    <div className={classes.container}>
      <Label>Results</Label>
      <ResultTab date="12-09-22" />
    </div>
  );
};

export default Results;
