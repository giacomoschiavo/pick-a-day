import React from "react";
import classes from "./Day.module.css";

const Day = (props) => {
  const onClickHandler = () => {
    props.onDayClick(props.date);
  };

  return (
    <div
      className={`${props.className} ${classes.container} ${
        props.selected && classes.selected
      }`}
      onClick={onClickHandler}
    >
      <p>{props.value}</p>
    </div>
  );
};

export default Day;
