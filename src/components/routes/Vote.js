import React from "react";
import classes from "./Vote.module.css";
import Label from "../ui/Label";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import AvailableDays from "../container/AvailableDays";

const Vote = () => {
  return (
    <div className={classes.container}>
      <Label>What's your name?</Label>
      <TextInput />
      <Label>Available days</Label>
      <AvailableDays />
      <Button className={classes.sendButton}>Send</Button>
      <p>or</p>
      <Button className={classes.resultsButton} isPrimary={false}>
        Show results
      </Button>
    </div>
  );
};

export default Vote;
