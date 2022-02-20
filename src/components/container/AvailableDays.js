import React from "react";
import classes from "./AvailableDays.module.css";
import Label from "../ui/Label";
import Day from "../ui/Day";
import { divideInMonths } from "../../utils";

const availableDates = [
  "12/2/2022",
  "13/2/2022",
  "14/2/2022",
  "17/2/2022",
  "19/2/2022",
  "2/3/2022",
  "3/3/2022",
  "4/3/2022",
  "7/3/2022",
  "9/3/2022",
];

const AvailableDays = (props) => {
  const formattedDates = divideInMonths(availableDates);
  return (
    <div className={classes.container}>
      {Object.keys(formattedDates).map((month) => (
        <div className={classes.monthContainer} key={month}>
          <Label className={classes.label}>{month}</Label>
          <div className={classes.days}>
            {formattedDates[month].map((day) => (
              <Day key={day}>{day}</Day>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableDays;
