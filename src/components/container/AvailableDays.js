import React from "react";
import classes from "./AvailableDays.module.css";
import Label from "../ui/Label";
import Day from "../ui/Day";
import { divideInMonths, createDate } from "../../utils";

const availableDates = [
  "12/2/2022",
  "13/2/2022",
  "14/2/2022",
  "17/2/2022",
  "19/2/2022",
  "2/3/2022",
  "3/3/2022",
  "4/3/2024",
  "7/3/2022",
  "9/3/2023",
];

const AvailableDays = (props) => {
  const formattedDates = divideInMonths(availableDates);

  const addDay = (date) => {
    const index = props.availableDays.indexOf(date.getTime());
    if (index > -1) {
      props.setAvailableDays((prev) =>
        prev.filter((aDate) => aDate !== date.getTime())
      );
    } else {
      props.setAvailableDays((prev) => [...prev, date.getTime()]);
    }
  };

  return (
    <div className={classes.container}>
      {Object.keys(formattedDates).map((year) => (
        <div className={classes.monthContainer} key={year}>
          <Label className={classes.label}>{year}</Label>
          {Object.keys(formattedDates[year]).map((month) => (
            <div className={classes.monthContainer} key={month}>
              <Label className={classes.label}>{month}</Label>
              <div className={classes.days}>
                {formattedDates[year][month].map((day) => (
                  <Day
                    key={day}
                    date={createDate(day, month, year)}
                    addDay={addDay}
                  >
                    {day}
                  </Day>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AvailableDays;
