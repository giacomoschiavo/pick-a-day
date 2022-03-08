import React from "react";
import classes from "./AvailableDays.module.css";
import Day from "../ui/Day";
import { divideInMonths, getCapitalLetterMonth } from "../../utils";

const AvailableDays = (props) => {
  const formattedDates = divideInMonths(Object.keys(props.chosenDays));
  return (
    <div className={classes.container}>
      {Object.keys(formattedDates).map((year) =>
        Object.keys(formattedDates[year]).map((month) => (
          <div className={classes.monthContainer} key={month}>
            <p className={classes.label}>{getCapitalLetterMonth(month)}</p>
            <div className={classes.days}>
              {formattedDates[year][month].map((day) => (
                <Day
                  key={day}
                  gap={10}
                  date={`${day}/${month}/${year}`}
                  selected={props.chosenDays[`${day}/${month}/${year}`]}
                  onDayClick={props.onDayClick}
                  value={day}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableDays;
