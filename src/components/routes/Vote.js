import React, { useCallback, useEffect, useState } from "react";
import classes from "./Vote.module.css";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import AvailableDays from "../container/AvailableDays";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Colors, filterSelected } from "../../utils";
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
  const [partecipants, setPartecipants] = useState({});

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
    if (localStorage.getItem(localStorageItem) != null) {
      if (JSON.parse(localStorage.getItem(localStorageItem))[id] != null) {
        setHasAlreadyLogged(true);
        setUserName(JSON.parse(localStorage.getItem(localStorageItem))[id]);
      }
    }
  }, [id]);

  //get event info if the user has already voted
  useEffect(() => {
    let unmounted = false;
    setIsLoading(true);
    if (!unmounted) {
      handleRequest(axios.get(`/api/v1/event/${id}`), (res) => {
        setEventName(res.data.name);
        // crea oggetto date tipo {'12/9/2022': false}, nessuna data e' selezionata di default
        const newChosenDays = res.data.days.reduce((obj, day) => {
          obj[day] = false;
          return obj;
        }, {});
        setChosenDays(newChosenDays);
        setPartecipants(res.data.partecipants);
      });
    }
    return () => (unmounted = true);
  }, [id]);

  //get event info if the user has already voted
  useEffect(() => {
    if (!hasAlreadyLogged || Object.keys(partecipants).length === 0) return;
    // take the username and toggle the available days
    setChosenDays((prevChosenDay) => {
      let newChosenDays = { ...prevChosenDay };
      partecipants[userName].forEach((date) => (newChosenDays[date] = true));
      return newChosenDays;
    });
  }, [hasAlreadyLogged, userName, partecipants]);

  const handleRequest = (req, callback) => {
    req
      .then((res) => {
        callback(res);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setShowPopup(true);
      })
      .finally(() => setIsLoading(false));
  };

  //uplaod data managing all the possible user's cases
  const uploadData = async () => {
    const errorThrown = checkErrorsAndShowPopup(
      setError,
      setShowPopup,
      checkUsername(userName),
      checkChosenDays(chosenDays, hasAlreadyLogged)
    );
    if (errorThrown) {
      return;
    }
    // se arriva qui non ci sono errori di input
    setIsLoading(true);
    if (!hasAlreadyLogged) {
      //case where user has never voted before
      handleRequest(
        axios.post("/api/v1/partecipants", {
          name: userName,
          available: filterSelected(chosenDays),
          eventId: id,
        }),
        () => {
          localStorage.setItem(
            localStorageItem,
            JSON.stringify({ [id]: userName })
          );
          navigateToResults();
        }
      );
    } else {
      if (filterSelected(chosenDays).length === 0) {
        //case where user has already voted and has chosen 0 days available, so he wants to get eliminated
        handleRequest(
          axios.delete("/api/v1/partecipants", {
            headers: {},
            data: {
              name: userName,
              eventId: id,
            },
          }),
          () => {
            localStorage.setItem(
              localStorageItem,
              JSON.stringify({ [id]: null })
            );
            navigateToResults();
          }
        );
      } else {
        //case where user has already voted and has chosen some days
        handleRequest(
          axios.patch("/api/v1/partecipants", {
            name: userName,
            available: filterSelected(chosenDays),
            eventId: id,
          }),
          navigateToResults
        );
      }
    }
  };

  const onDayClickHandler = (date) => {
    // toggles the value in the corresponding date
    setChosenDays((prevDays) => {
      const newDays = { ...prevDays };
      newDays[date] = !newDays[date];
      return newDays;
    });
  };

  // checks if the user is deletable (no chosen days)
  const isDeletable = () => {
    return hasAlreadyLogged && filterSelected(chosenDays).length === 0;
  };

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
        <Button
          className={classes.sendButton}
          backgroundColor={isDeletable() && Colors.red}
          onClick={() => uploadData()}
        >
          {isDeletable() ? "Remove me from the event" : "Vote"}
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
