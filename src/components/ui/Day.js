import React, { useState } from "react";
import classes from "./Day.module.css";

const Day = (props) => {
  const [selected, setSelected] = useState(false);

  const onClickHandler = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div
      className={`${classes.container} ${selected && classes.selected}`}
      onClick={onClickHandler}
    >
      <p>{props.children}</p>
    </div>
  );
};

export default Day;
