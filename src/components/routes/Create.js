import React from "react";
import Button from "../ui/Button";
import { useState, useEffect } from "react";
import Label from "../ui/Label";
import Calendar from "react-calendar";
import TextInput from "../ui/TextInput";
import { useNavigate } from "react-router-dom";
import classes from "./Create.module.css";
import "../ui/Calendar.css";
const Create = () => {
  const [eventName, setEventName] = useState("");

  const navigate = useNavigate();

  const navigateToVote = () => {
    navigate("/vote");
  };

  useEffect(() => {
    console.log(eventName);
  }, [eventName]);

  return (
    <>
      <Label>What's the event name?</Label>
      <TextInput value={eventName} setValue={setEventName} />
      <Label>When?</Label>
      <Calendar />
      <Button className={classes.createButton} onClick={navigateToVote}>
        Create
      </Button>
    </>
  );
};

export default Create;
