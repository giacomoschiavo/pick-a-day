import React from "react";
import classes from "./AvailableDays.module.css";
import Label from "../ui/Label";
import Day from "../ui/Day";
import { dateToFormat, divideInMonths } from "../../utils";

// crea la data formattata per il BE, a partire da giorno, mese (es. 'Febbraio'), anno
const createFormattedDate = (d, m, y) =>
  dateToFormat(new Date(`${m}/${d}/${y}`));

const AvailableDays = (props) => {
  console.log(props.chosenDays);
  const formattedDates = divideInMonths(Object.keys(props.chosenDays));
  console.log(formattedDates);

  // const addDay = (date) => {
  //   const index = props.choosenDays.indexOf(date.getTime());
  //   if (index > -1) {
  //     props.setChoosenDays((prev) =>
  //       prev.filter((aDate) => aDate !== date.getTime())
  //     );
  //   } else {
  //     props.setChoosenDays((prev) => [...prev, date.getTime()]);
  //   }
  // };

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
                    date={createFormattedDate(day, month, year)}
                    selected={
                      props.chosenDays[createFormattedDate(day, month, year)]
                    }
                    onDayClick={props.onDayClick}
                    value={day}
                  />
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
