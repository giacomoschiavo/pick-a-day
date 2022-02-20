import React from "react";
import Button from "../ui/Button";
import { useState } from "react";
import Label from "../ui/Label";
import Calendar from "react-calendar";
import TextInput from "../ui/TextInput";
import { useNavigate } from "react-router-dom";
import classes from "./Create.module.css";
import "../ui/Calendar.css";
import { dateToFormat } from "../../utils";
const Create = () => {
  const [eventName, setEventName] = useState("");
  const [eventDays, setEventDays] = useState([]);

  const navigate = useNavigate();

  const navigateToVote = () => {
    console.log("Nome scelto:", eventName);
    const formattedDates = eventDays.map(dateToFormat);
    console.log("Giorni scelti:", formattedDates);
    // navigate("/vote");
  };

  const onClickDayHandler = (date, e) => {
    const dateToCheck = new Date(date).getTime();
    // const dateFormatted = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
    // elimina il giorno gia presente
    if (eventDays.indexOf(dateToCheck) > -1) {
      setEventDays((prev) => prev.filter((date) => date !== dateToCheck));
    } else {
      // oppure lo aggiunge
      setEventDays((prev) => [...prev, dateToCheck]);
    }
  };

  const getTileClassName = ({ date }) => {
    // se la data e' stata selezionata, aggiungi la classe
    const dateToCheck = new Date(date).getTime();
    const foundDay = eventDays.find((day) => day === dateToCheck);
    return foundDay ? classes.selectedDate : "";
  };

  return (
    <>
      <Label>What's the event name?</Label>
      <TextInput value={eventName} setValue={setEventName} />
      <Label>When?</Label>
      <Calendar
        tileClassName={(date) => getTileClassName(date)}
        onClickDay={onClickDayHandler}
      />
      <Button className={classes.createButton} onClick={navigateToVote}>
        Create
      </Button>
    </>
  );
};

export default Create;
