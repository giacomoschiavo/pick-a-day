import React, { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../ui/Button";
import Calendar from "react-calendar";
import TextInput from "../ui/TextInput";
import Section from "../container/Section";
import "../ui/Calendar.css";
import {
  checkErrorsAndShowPopup,
  dateToFormat,
  handleRequest,
  isBeforeToday,
} from "../../utils";
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

  const navigateToVote = () => {
    const thrownError = checkErrorsAndShowPopup(
      setError,
      setShowPopup,
      validateEventName(eventName),
      validateEventDays(eventDays)
    );
    if (thrownError) return;

    setIsLoading(true);

    //TODO: convert to the synchronous way
    const formattedDates = eventDays.map(dateToFormat);
    handleRequest(
      setError,
      setShowPopup,
      setIsLoading,
      axios.post("/api/v1/event", {
        days: formattedDates,
        name: eventName,
      }),
      (res) => navigate(`/${res.data._id}`)
    );
  };

  // works
  const onClickDayHandler = useCallback(
    (date) => {
      const dateToCheck = new Date(date).getTime();
      if (isBeforeToday(dateToCheck)) return; // date before today could not be
      // toggles the presence of this day from [eventDays]
      if (eventDays.indexOf(dateToCheck) > -1) {
        setEventDays((prev) => prev.filter((date) => date !== dateToCheck));
      } else {
        setEventDays((prev) => [...prev, dateToCheck]);
      }
    },
    [eventDays]
  );

  const getTileClassName = ({ date }) => {
    // se la data e' stata selezionata, aggiungi la classe
    const dateToCheck = date.getTime();
    if (isBeforeToday(dateToCheck)) return classes.beforeToday;
    let className = null;
    const foundDay = eventDays.find((day) => day === dateToCheck);
    const today = new Date();
    if (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    )
      className = classes.today;
    className = foundDay ? classes.selectedDate : className;
    return className;
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={classes.container}>
        <h1 className={classes.title}>Let's organize something!</h1>
        <Section label="What is the name of the event?????">
          <TextInput
            value={eventName}
            setValue={setEventName}
            placeholder="Bowling party????"
          />
        </Section>
        <Section label="When does it take place????">
          <Calendar
            tileClassName={getTileClassName}
            onClickDay={onClickDayHandler}
            className={classes.calendar}
          />
        </Section>
        <Button
          type="primary"
          className={classes.createButton}
          onClick={navigateToVote}
        >
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
