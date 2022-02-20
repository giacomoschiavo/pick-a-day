import React from "react";
import Label from "../ui/Label";
import ResultTab from "../ui/ResultTab";
import classes from "./Results.module.css";

const participants = ["gigi", "gigio", "luigi", "marla", "ludobecca"];

const okDays = [
  {
    date: "10-09-22",
  },
  {
    date: "11-09-22",
  },
];

const otherDays = [
  {
    date: "12-09-22",
    participants,
  },
  {
    date: "13-09-22",
    participants,
  },
  {
    date: "14-09-22",
    participants,
  },
  {
    date: "15-09-22",
    participants,
  },
  {
    date: "16-09-22",
    participants,
  },
];

const Results = () => {
  return (
    <div className={classes.container}>
      <Label>Results</Label>
      <div className={classes.resultsTab}>
        {okDays.map((day) => (
          <ResultTab date={day.date} success />
        ))}
      </div>
      <Label>Other days</Label>
      <div className={classes.resultsTab}>
        {otherDays.map((day) => (
          <ResultTab date={day.date} participants={day.participants} />
        ))}
      </div>
    </div>
  );
};

export default Results;
