import { useState } from "react";
import Day from "./Day";
import classes from "./ResultTab.module.css";
import { getCapitalLetterMonth } from "../../utils";
import { BiChevronDown } from "react-icons/bi";
import Tab from "../container/Tab";

const ResultTab = (props) => {
  const [show, setShow] = useState(false);

  const clicked = () => {
    setShow((prev) => !prev);
  };

  let availableParts = props.parts;
  let notAvailParts = null;
  if (props.nonParts) {
    // tieni i partecipanti che non sono presenti in nonPart
    availableParts = availableParts.filter(
      (part) => props.nonParts.find((nonPart) => nonPart === part) === undefined
    );
    availableParts = availableParts.length === 0 ? null : availableParts;
    notAvailParts = props.nonParts;
  }

  return (
    <>
      <Tab onClick={clicked} color={props.color || "#000000"}>
        <div className={classes.date}>
          <Day
            value={props.date.getDate()}
            className={classes.day}
            onDayClick={() => {}}
          />
          <p className={classes.month}>
            {getCapitalLetterMonth(props.date.getMonth() + 1)}
          </p>
        </div>
        <div className={`${classes.iconContainer} ${show && classes.rotated}`}>
          <BiChevronDown className={classes.icon} />
        </div>
      </Tab>
      {show && (
        <div className={classes.list}>
          {availableParts && (
            <div className={classes.parts}>
              {availableParts.map((part, i) => (
                <p className={classes.part} key={i}>
                  ✅ {part}
                </p>
              ))}
            </div>
          )}
          {notAvailParts && (
            <div className={classes.parts}>
              {notAvailParts.map((part, i) => (
                <p className={classes.part} key={i}>
                  ❌ {part}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ResultTab;
