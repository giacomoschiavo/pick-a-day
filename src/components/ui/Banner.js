import React from "react";
import classes from "./Banner.module.css";
import cover from "../../assets/cover.jpg";
import { Colors } from "../../utils";
import Button from "./Button";

const Banner = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.coverContainer}>
        <div className={classes.greenCover} />
        <img src={cover} alt="cover" className={classes.cover} />
      </div>
      <div className={classes.overlay}>
        <p className={classes.firstLine} style={{ color: Colors.white }}>
          <span>Organize your events</span> <br /> <b>in seconds</b>
        </p>
        <p className={classes.secondLine} style={{ color: Colors.white }}>
          Want to ask your friends where to go friday night or arrange a meeting
          with co-workers? Create a new event, share the link and choose the
          best day for everyone.
        </p>
        <Button
          // className={classes.createEvent}
          type="secondary"
          style={{ color: Colors.primary, backgroundColor: Colors.white }}
          onClick={props.goToCreate}
        >
          Create event
        </Button>
      </div>
    </div>
  );
};

export default Banner;
