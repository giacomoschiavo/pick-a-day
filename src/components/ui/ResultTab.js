import { useState } from "react";
import Day from "./Day";
import classes from "./ResultTab.module.css";
import { getCapitalLetterMonth } from "../../utils";
import { BiChevronDown } from "react-icons/bi";

const ResultTab = (props) => {
  const [show, setShow] = useState(false);

  const clicked = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <div className={classes.container} onClick={clicked}>
        <div className={classes.date}>
          <Day
            value={props.date.getDate()}
            className={classes.day}
            onDayClick={() => {}}
          />
          <p className={classes.month}>
            {getCapitalLetterMonth(props.date.getMonth())}
          </p>
        </div>
        <div className={`${classes.iconContainer} ${show && classes.rotated}`}>
          <BiChevronDown className={classes.icon} />
        </div>
      </div>
      {show && (
        <div className={classes.list}>
          {props.nonParts &&
            props.nonParts.map((part, i) => <p key={i}>{part}</p>)}
        </div>
      )}
    </>
  );
};

export default ResultTab;
