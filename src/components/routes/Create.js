import React from "react";
import Button from "../ui/Button";
import Label from "../ui/Label";
import Calendar from "react-calendar";
import TextInput from "../ui/TextInput";
import "../ui/Calendar.css";
import classes from "./Create.module.css";
const Create = () => {
  return (
    <>
      <Label>What's the event name?</Label>
      <TextInput />
      <Label>When?</Label>
      <Calendar />
      <Button className={classes.createButton}>Create</Button>
    </>
  );
};

export default Create;
