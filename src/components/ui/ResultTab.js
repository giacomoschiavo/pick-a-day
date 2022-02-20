import { useState } from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import classes from "./ResultTab.module.css";

const ResultTab = (props) => {
  const [show, setShow] = useState(false);

  const clicked = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <div className={classes.container} onClick={clicked}>
        <div
          className={`${classes.icon} ${
            props.success === true && classes.success
          }`}
        >
          {props.success ? <BsHandThumbsUp /> : <BsHandThumbsDown />}
        </div>
        <p>{props.date || "No date"}</p>
        <div className={classes.participants}>
          <p>9/9</p>
        </div>
      </div>
      {!props.success && show && (
        <div className={classes.list}>
          {props.participants &&
            props.participants.map((part) => <p>{part}</p>)}
        </div>
      )}
    </>
  );
};

export default ResultTab;
