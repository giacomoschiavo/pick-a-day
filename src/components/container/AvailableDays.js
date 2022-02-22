import React from "react";
import classes from "./AvailableDays.module.css";
import Label from "../ui/Label";
import Day from "../ui/Day";
import { divideInMonths, createDate } from "../../utils";

const AvailableDays = (props) => {
  const formattedDates = divideInMonths(props.availableDates);

  const addDay = (date) => {
    const index = props.choosenDays.indexOf(date.getTime());
    if (index > -1) {
      props.setChoosenDays((prev) =>
        prev.filter((aDate) => aDate !== date.getTime())
      );
    } else {
      props.setChoosenDays((prev) => [...prev, date.getTime()]);
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
