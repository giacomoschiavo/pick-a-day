import React, { useEffect, useState } from "react";
import classes from "./Vote.module.css";
import Label from "../ui/Label";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import AvailableDays from "../container/AvailableDays";
import axios from "axios";

const Vote = () => {
  //determinates if user has already visited the page
  useEffect(() => {
    axios
      .get("https://geolocation-db.com/json/")
      .then(function (response) {
        //TODO controllare se l'utente è giá stato inserito e chiamare setHasAlreadyLogged
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [hasAlreadyLogged, setHasAlreadyLogged] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    console.log(availableDays);
  }, [availableDays]);

  const eventName = "Cena con i boys"; //TODO da reperire dal backend
  const userName = "Enrico"; //TODO prendere nome da textinput o dal server se l'user é loggato

  return (
    <div className={classes.container}>
      <Label>What's your name?</Label>
      <TextInput value={userName} disabled={hasAlreadyLogged} />
      <Label>When are you available for "{eventName}" ?</Label>
      <AvailableDays
        availableDays={availableDays}
        setAvailableDays={setAvailableDays}
      />
      <Button className={classes.sendButton}>Send</Button>
      <p>or</p>
      <Button className={classes.resultsButton} isPrimary={false}>
        Show results
      </Button>
    </div>
  );
};

export default Vote;
