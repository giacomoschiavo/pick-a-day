import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../ui/Button";
import Calendar from "react-calendar";
import TextInput from "../ui/TextInput";
import Section from "../container/Section";
import "../ui/Calendar.css";
import { checkErrorsAndShowPopup, dateToFormat } from "../../utils";
import { validateEventDays, validateEventName } from "../../validations";
import classes from "./Create.module.css";
import Popup from "../ui/Popup";
import Loading from "../ui/Loading";

const Create = () => {
  const [eventName, setEventName] = useState("");
  const [eventDays, setEventDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const navigateToVote = async () => {
    const thrownError = checkErrorsAndShowPopup(
      setError,
      setShowPopup,
      validateEventName(eventName),
      validateEventDays(eventDays)
    );
    if (thrownError) return;

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDayHandler = (date) => {
    const dateToCheck = new Date(date).getTime();
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
      {isLoading && <Loading />}
      <div className={classes.container}>
        <h1 className={classes.title}>Let's organize something!</h1>
        <Section label="What is the name of the event?🍿">
          <TextInput value={eventName} setValue={setEventName} />
        </Section>
        <Section label="When does it take place?⌚">
          <Calendar
            tileClassName={getTileClassName}
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
