import React from "react";
import Calendar from 'react-calendar';
import Button from "../ui/Button";
import Label from "../ui/Label";
import TextInput from "../ui/TextInput";
import classes from "./Home.module.css";
import "../ui/Calendar.css";

const Home = () => {
  return <>
    <Label>What's the event name?</Label>
    <TextInput />
    <Label>When?</Label>
    <Calendar />
    <Button className={classes.createButton}>Create</Button>
  </>;
};

export default Home;
