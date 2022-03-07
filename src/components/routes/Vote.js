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
import Share from "../ui/Share";
import Popup from "../ui/Popup";
import Loading from "../ui/Loading";
import { checkUsername, checkChosenDays } from "../../validations";
import { checkErrorsAndShowPopup } from "../../utils";

// le date sono passate ai figli con questa struttura
// {"16/2/2022": true, "24/2/2022": false, etc} dove il booleano
// indica se la data e' stata selezionata

const localStorageItem = "eventsList";

const Vote = () => {
  const [hasAlreadyLogged, setHasAlreadyLogged] = useState(false);
  const [chosenDays, setChosenDays] = useState({});
  const [userName, setUserName] = useState("");
  const [eventName, setEventName] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const navigateToResults = useCallback(() => {
    navigate(`/${id}/results`);
  }, [id, navigate]);

  //determinates if user has already visited the page
  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem(localStorageItem) != null) {
      if (JSON.parse(localStorage.getItem(localStorageItem))[id] != null) {
        setHasAlreadyLogged(true);
        setUserName(JSON.parse(localStorage.getItem(localStorageItem))[id]);
      }
    }
    setIsLoading(false);
  }, [id]);

  //get event info if the user has already voted
  useEffect(() => {
    let unmounted = false;
    if (!hasAlreadyLogged) {
      return () => (unmounted = true);
    }
    setIsLoading(true);
    if (!unmounted) {
      axios
        .get(`/api/v1/event/${id}`)
        .then((res) => {
          setEventName(res.data.name);
          // crea oggetto date tipo {'12/9/2022': false}, nessuna data e' selezionata di default
          const newChosenDays = res.data.days.reduce((obj, day) => {
            obj[day] = false;
            return obj;
          }, {});
          res.data.partecipants[userName].forEach(
            (date) => (newChosenDays[date] = true)
          );
          setChosenDays(newChosenDays);
        })
        .catch((error) => {
          setError(error.response.data.msg);
          setShowPopup(true);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }

    return () => (unmounted = true);
  }, [id, hasAlreadyLogged, userName]);

  //get event info if the user has NOT already voted
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (hasAlreadyLogged) {
        return () => (unmounted = true);
      }
      setIsLoading(true);
      axios
        .get(`/api/v1/event/${id}`)
        .then((res) => {
          setEventName(res.data.name);
          // crea oggetto date tipo {'12/9/2022': false}, nessuna data e' selezionata di default
          const newChosenDays = res.data.days.reduce((obj, day) => {
            obj[day] = false;
            return obj;
          }, {});
          setChosenDays(newChosenDays);
        })
        .catch((error) => {
          setError(error.response.data.msg);
          setShowPopup(true);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }

    return () => (unmounted = true);
  }, [id, hasAlreadyLogged]);

  //check for errors before uploading the data

  //uplaod data managing all the possible user's cases
  async function uploadData() {
    const errorThrown = checkErrorsAndShowPopup(
      setError,
      setShowPopup,
      checkUsername(userName),
      checkChosenDays(chosenDays, hasAlreadyLogged)
    );
    if (errorThrown) {
      return;
    }
    setIsLoading(true);
    if (!hasAlreadyLogged) {
      //case where user has never voted before
      const dataToSend = {
        name: userName,
        available: filterSelected(chosenDays),
        eventId: id,
      };
      axios
        .post("/api/v1/partecipants", dataToSend)
        .then((res) => {
          let newEventList = {};
          newEventList[id] = userName;
          localStorage.setItem(localStorageItem, JSON.stringify(newEventList));
          navigateToResults();
        })
        .catch((error) => {
          setError(error.response.data.msg);
          setShowPopup(true);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      if (filterSelected(chosenDays).length === 0) {
        //case where user has already voted and has chosen 0 days available, so he wants to get eliminated
        axios
          .delete("/api/v1/partecipants", {
            headers: {},
            data: {
              name: userName,
              eventId: id,
            },
          })
          .then((res) => {
            navigateToResults();
          })
          .catch((error) => {
            setError(error.response.data.msg);
            setShowPopup(true);
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      } else {
        //case where user has already voted and has chosen some days
        axios
          .patch("/api/v1/partecipants", {
            name: userName,
            available: filterSelected(chosenDays),
            eventId: id,
          })
          .then((res) => {
            navigateToResults();
          })
          .catch((error) => {
            setError(error.response.data.msg);
            setShowPopup(true);
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      }
    }
    return;
  }

  function onDayClickHandler(date) {
    // toggles the value in the corresponding date
    setChosenDays((prevDays) => {
      const newDays = { ...prevDays };
      newDays[date] = !newDays[date];
      return newDays;
    });
  }

  return (
    <>
      {loading && <Loading />}
      <EventBanner eventName={eventName} />
      <div className={classes.container}>
        {/* <p>{error}</p> */}
        <Section label="What is your name?🏷️" sub="You cannot change it later">
          <TextInput
            value={userName}
            disabled={hasAlreadyLogged}
            setValue={setUserName}
          />
        </Section>
        <Section label="Choose your days📌">
          <AvailableDays
            onDayClick={onDayClickHandler}
            chosenDays={chosenDays}
          />
        </Section>
        <Button className={classes.sendButton} onClick={() => uploadData()}>
          {hasAlreadyLogged && filterSelected(chosenDays).length === 0
            ? "Delete me"
            : "Vote"}
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
      <Share url={`https://pick-a-day.netlify.app/${id}`} />
      {showPopup && (
        <Popup closePopup={() => setShowPopup(false)}>{error}</Popup>
      )}
    </>
  );
};

export default Vote;
