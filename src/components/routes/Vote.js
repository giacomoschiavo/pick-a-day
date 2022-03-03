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

// le date sono passate ai figli con questa struttura
// {"16/2/2022": true, "24/2/2022": false, etc} dove il booleano
// indica se la data e' stata selezionata

const localStorageItem = "eventsList";

const Vote = () => {
  const [hasAlreadyLogged, setHasAlreadyLogged] = useState(false);
  const [chosenDays, setChosenDays] = useState({});
  const [userName, setUserName] = useState("");
  const [eventName, setEventName] = useState("");
  const [sendingData, setSendingData] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const navigateToResults = useCallback(() => {
    navigate(`/${id}/results`);
  }, [id, navigate]);

  //get user ip
  // useEffect(() => {
  //   let unmounted = false;
  //   axios
  //     .get("https://geolocation-db.com/json/")
  //     .then((res) => {
  //       if (!unmounted) setIp(res.data.IPv4);
  //     })
  //     .catch((err) => {
  //       if (!unmounted) {
  //         setError(err.response);
  //         setShowPopup(true);
  //         console.log(err.response);
  //       }
  //     });
  //   return () => {
  //     unmounted = true;
  //   };
  // }, []);

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

  // get event info
  useEffect(() => {
    let unmounted = false;
    if (eventName === "") {
      setIsLoading(true);
      axios
        .get(`/api/v1/event/${id}`)
        .then((res) => {
          if (!unmounted) {
            // non facciamo nessun controllo da cio che arriva, ci fidiamo di 🅱️ietro
            setEventName(res.data.name);
            // crea oggetto date tipo {'12/9/2022': false}, nessuna data e' selezionata di default
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
          }
        })
        .catch((error) => {
          if (!unmounted) {
            setError(error.response.data.msg);
            setShowPopup(true);
            console.log(error);
          }
        })
        .finally(() => setIsLoading(false));
    }
    return () => {
      setIsLoading(false);
      unmounted = true;
    };
  }, [id, hasAlreadyLogged, userName, eventName]);

  // updates data in database
  useEffect(() => {
    let unmounted = false;
    if (sendingData) {
      if (userName.trim() === "") {
        setError("Please, write your name🖊️");
        setShowPopup(true);
        setSendingData(false);
        return;
      }
      if (userName.length < 3 || userName.length > 15) {
        setError("Please, choose a name between 3 and 15 characters📏");
        setShowPopup(true);
        setSendingData(false);
        return;
      }
      if (filterSelected(chosenDays).length < 1 && !hasAlreadyLogged) {
        setError("Please, choose at least one day🐣");
        setShowPopup(true);
        setSendingData(false);
        return;
      }
      setIsLoading(true);
      if (!hasAlreadyLogged) {
        const dataToSend = {
          name: userName,
          available: filterSelected(chosenDays),
          eventId: id,
        };
        axios
          .post("/api/v1/partecipants", dataToSend)
          .then((res) => {
            if (!unmounted) {
              setSendingData(false);
              if (localStorage.getItem(localStorageItem) != null) {
                let newEventList = JSON.parse(
                  localStorage.getItem(localStorageItem)
                );
                newEventList[id] = userName;
                localStorage.setItem(
                  localStorageItem,
                  JSON.stringify(newEventList)
                );
              } else {
                let newEventList = {};
                newEventList[id] = userName;
                localStorage.setItem(
                  localStorageItem,
                  JSON.stringify(newEventList)
                );
              }
              navigateToResults();
            }
          })
          .catch((error) => {
            if (!unmounted) {
              setError(error.response.data.msg);
              setShowPopup(true);
              console.log(error);
              setSendingData(false);
            }
          })
          .finally(() => setIsLoading(false));
      } else if (filterSelected(chosenDays).length === 0 && hasAlreadyLogged) {
        axios
          .delete("/api/v1/partecipants", {
            headers: {},
            data: {
              name: userName,
              eventId: id,
            }
          })
          .then((res) => {
            setSendingData(false);
            navigateToResults();
          })
          .catch((error) => {
            if (!unmounted) {
              setError(error.response.data.msg);
              setShowPopup(true);
              console.log(error);
              setSendingData(false);
            }
          })
          .finally(() => setIsLoading(false));
      } else if (filterSelected(chosenDays).length !== 0) {
        console.log(chosenDays)
        axios
          .patch("/api/v1/partecipants", {
            name: userName,
            available: filterSelected(chosenDays),
            eventId: id,
          })
          .then((res) => {
            if (!unmounted) {
              setSendingData(false);
              navigateToResults();
              console.log(res.status);
            }
          })
          .catch((error) => {
            if (!unmounted) {
              setError(error.response.data.msg);
              setShowPopup(true);
              console.log(error);
              setSendingData(false);
            }
          })
          .finally(() => setIsLoading(false));
      }
    }
    return () => {
      unmounted = true;
      setIsLoading(false);
    };
  }, [
    chosenDays,
    hasAlreadyLogged,
    sendingData,
    userName,
    id,
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
          onClick={() => setSendingData(true)}
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
      <Share url={`https://pick-a-day.netlify.app/${id}`} />
      {showPopup && (
        <Popup closePopup={() => setShowPopup(false)}>{error}</Popup>
      )}
    </>
  );
};

export default Vote;
