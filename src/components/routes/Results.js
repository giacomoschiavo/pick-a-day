import React from "react";
import Label from "../ui/Label";
import ResultTab from "../ui/ResultTab";
import classes from "./Results.module.css";

const participants = ["gigi", "gigio", "luigi", "marla", "ludobecca"];

const okDays = [
  {
    date: "10/9/2022",
  },
  {
    date: "11/9/2022",
  },
];

const otherDays = [
  {
    date: "12/9/2022",
    participants,
  },
  {
    date: "13/9/2022",
    participants,
  },
  {
    date: "14/9/2022",
    participants,
  },
  {
    date: "15/9/2022",
    participants,
  },
  {
    date: "16/9/2022",
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
