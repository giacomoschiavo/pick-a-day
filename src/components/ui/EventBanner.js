import React from "react";
import classes from "./EventBanner.module.css";
const EventBanner = (props) => {
  return (
    <div className={classes.container}>
      <h1>{props.eventName}</h1>
    </div>
  );
};

export default EventBanner;
