import React from "react";
import Button from "../ui/Button";
import Label from "../ui/Label";
import classes from "./Create.module.css";
const Create = () => {
  return (
    <div>
      <Label className={classes.labelHome}>What is the event name?</Label>
      <input />
      <Label className={classes.labelHome}>When?</Label>
      {/* calendario */}
      <Button className={classes.btn} value="Create" />
    </div>
  );
};

export default Create;
