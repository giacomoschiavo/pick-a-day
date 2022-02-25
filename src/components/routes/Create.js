import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../ui/Button";
import Calendar from "react-calendar";
import TextInput from "../ui/TextInput";
import Section from "../container/Section";
import "../ui/Calendar.css";
import { dateToFormat, checkPreviousDays } from "../../utils";
import classes from "./Create.module.css";
import Popup from "../ui/Popup";

const Create = () => {
  const [eventName, setEventName] = useState("");
  const [eventDays, setEventDays] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const navigateToVote = async () => {
    if (eventName.trim() === "") {
      setError("Please, choose a name for the event🗒️");
      setShowPopup(true);
      return;
    }
    if (eventDays.length < 2) {
      setError("Please, choose at least two days🎲");
      setShowPopup(true);
      return;
    }
    if (eventDays.length > 14) {
      setError("Please, you can maximum 14 days📅");
      setShowPopup(true);
      return;
    }
    if (checkPreviousDays(eventDays)) {
      setError("Please, choose future dates🔮");
      setShowPopup(true);
      return;
    }

    const formattedDates = eventDays.map(dateToFormat);
    try {
      const res = await axios.post("/api/v1/event", {
        days: formattedDates,
        name: eventName,
      });
      navigate(`/${res.data._id}`);
    } catch (error) {
      setError(error.response.data.msg);
      setShowPopup(true);
    }
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
      <div className={classes.container}>
        <Section label="What's the event name?">
          <TextInput value={eventName} setValue={setEventName} />
        </Section>
        <Section label="When?">
          <Calendar
            tileClassName={(date) => getTileClassName(date)}
            onClickDay={onClickDayHandler}
            className={classes.calendar}
          />
        </Section>
        <Button className={classes.createButton} onClick={navigateToVote}>
          Create
        </Button>
      </div>
      {showPopup && (
        <Popup closePopup={() => setShowPopup(false)}>{error}</Popup>
      )}
    </>
  );
};

export default Create;
