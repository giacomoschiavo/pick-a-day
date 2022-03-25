import React from "react";
import Label from "../ui/Label";
import classes from "./Section.module.css";

// Renders a big title (Label) and its children
// props needed: className?, props.sub?, props.label?, props.children?
const Section = (props) => {
  // console.log("Section.js re-rendered con ", props.label);
  return (
    <div className={`${props.className} ${classes.container}`}>
      <Label className={classes.label} sub={props.sub}>
        {props.label}
      </Label>
      {props.children}
    </div>
  );
};

// this substitutes shouldComponentUpdate
// if true, the update is skipped
export default React.memo(Section, (prevProps, nextProps) => {
  // if value in textInput is the same, don't update
  if (prevProps.children.props.value)
    return prevProps.children.props.value === nextProps.children.props.value;

  // don't render if empty string
  if (
    prevProps.children.props.value === "" &&
    nextProps.children.props.value === ""
  )
    return true;

  // if eventDays did not change, so onClickDay did and so an update is not needed
  // this works thanks to useCallback
  if (prevProps.children.props.onClickDay)
    return (
      prevProps.children.props.onClickDay ===
      nextProps.children.props.onClickDay
    );

  return false;
});
