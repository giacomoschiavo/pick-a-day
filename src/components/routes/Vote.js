import React, { useCallback, useEffect, useState } from "react";
import classes from "./Vote.module.css";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import AvailableDays from "../container/AvailableDays";
import axios from "axios";
import { useParams } from "react-router-dom";
import { filterSelected } from "../../utils";
import { useNavigate } from "react-router-dom";
import Section from "../container/Section";
import EventBanner from "../ui/EventBanner";

// le date sono passate ai figli con questa struttura
// {"16/2/2022": true, "24/2/2022": false, etc} dove il booleano
// indica se la data e' stata selezionata

const Vote = () => {
  const [hasAlreadyLogged, setHasAlreadyLogged] = useState(false);
  const [chosenDays, setChosenDays] = useState({});
  const [userName, setUserName] = useState("");
  const [eventName, setEventName] = useState("");
  const [sendingData, setSendingData] = useState(false);
  const [ip, setIp] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const navigateToResults = useCallback(() => {
    navigate(`/${id}/results`);
  }, [id, navigate]);

  //get user ip
  useEffect(() => {
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        setIp(res.data.IPv4);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //determinates if user has already visited the page
  useEffect(() => {
    if (localStorage.getItem("eventsList") != null) {
      if (JSON.parse(localStorage.getItem("eventsList"))[id] != null) {
        setHasAlreadyLogged(true);
        setUserName(JSON.parse(localStorage.getItem("eventsList"))[id]);
      }
    }
  }, [id]);

  //get event info
  useEffect(() => {
    axios
      .get(`/api/v1/event/${id}`)
      .then((res) => {
        // console.log(res.data);
        setEventName(res.data.name);
        // crea oggetto date, nessuna data e' selezionata di default
        const newChosenDays = res.data.days.reduce((obj, day) => {
          obj[day] = false;
          return obj;
        }, {});

        // se e' loggato, mette a true le date gia presenti
        if (hasAlreadyLogged) {
          res.data.partecipants[userName].forEach(
            (date) => (newChosenDays[date] = true)
          );
        }
        setChosenDays(newChosenDays);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, hasAlreadyLogged, userName]);

  //updates datas in database
  useEffect(() => {
    if (sendingData) {
      if (!hasAlreadyLogged) {
        const dataToSend = {
          ip: ip,
          name: userName,
          available: filterSelected(chosenDays),
          eventId: id,
        };
        console.log(dataToSend);
        axios
          .post("/api/v1/partecipants", dataToSend)
          .then((res) => {
            console.log(res.status);
            navigateToResults();
            setSendingData(false);
            if (localStorage.getItem("eventsList") != null) {
              let newEventList = JSON.parse(localStorage.getItem("eventsList"));
              newEventList[id] = userName;
              localStorage.setItem("eventsList", JSON.stringify(newEventList));
            } else {
              let newEventList = {};
              newEventList[id] = userName;
              localStorage.setItem("eventsList", JSON.stringify(newEventList));
            }
          })
          .catch((error) => {
            console.log(error);
            setSendingData(false);
          });
      } else {
        axios
          .patch("/api/v1/partecipants", {
            ip: ip,
            name: userName,
            available: filterSelected(chosenDays),
            eventId: id,
          })
          .then((res) => {
            setSendingData(false);
            navigateToResults();
            console.log(res.status);
          })
          .catch((error) => {
            console.log(error);
            setSendingData(false);
          });
      }
    }
  }, [
    chosenDays,
    hasAlreadyLogged,
    sendingData,
    userName,
    id,
    ip,
    navigateToResults,
  ]);

  const onDayClickHandler = (date) => {
    // toggles the value in the corresponding date
    setChosenDays((prevDays) => {
      const newDays = { ...prevDays };
      newDays[date] = !newDays[date];
      return newDays;
    });
  };

  return (
    <div className={classes.container}>
      <EventBanner eventName={eventName} />
      {/* <p>{error}</p> */}
      <Section label="What is your name?">
        <TextInput
          value={userName}
          disabled={hasAlreadyLogged}
          setValue={setUserName}
        />
      </Section>
      <Section label="Choose your days:">
        <AvailableDays onDayClick={onDayClickHandler} chosenDays={chosenDays} />
      </Section>
      <Button
        className={classes.sendButton}
        onClick={() => {
          if (userName === "") return;
          setSendingData(true);
        }}
      >
        Vote
      </Button>
      <p>or</p>
      <Button
        className={classes.resultsButton}
        isPrimary={false}
        onClick={navigateToResults}
      >
        Show results
      </Button>
    </div>
  );
};

export default Vote;
