import { useState } from "react";
import classes from "./ResultTab.module.css";
import { getCapitalLetterMonth } from "../../utils";
import { BiChevronDown } from "react-icons/bi";
import ItemTab from "../container/ItemTab";

// derives from Tab
// when clicked should drop a container that contains all the participants
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
    <div className={classes.container}>
      <ItemTab
        onClick={clicked}
        color={props.color || "#000000"}
        className={classes.tab}
        itemValue={props.date.getDate()}
      >
        <p className={classes.month}>
          {getCapitalLetterMonth(props.date.getMonth() + 1)}
        </p>
        <div className={`${classes.iconContainer} ${show && classes.rotated}`}>
          <BiChevronDown className={classes.icon} />
        </div>
      </ItemTab>

      <div className={`${classes.list} ${show && classes.translated}`}>
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
    </div>
  );
};

export default ResultTab;
