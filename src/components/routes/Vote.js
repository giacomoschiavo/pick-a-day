import React, { useEffect, useState } from "react";
import classes from "./Vote.module.css";
import Label from "../ui/Label";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import AvailableDays from "../container/AvailableDays";
import axios from "axios";
import { useParams } from "react-router-dom";
import { dateToFormat } from "../../utils";

const Vote = () => {

  const [hasAlreadyLogged, setHasAlreadyLogged] = useState(false);
  const [choosenDays, setChoosenDays] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [userName, setUserName] = useState('');
  const [eventName, setEventName] = useState('');
  const [sendingData, setSendingData] = useState(false);
  const [ip, setIp] = useState('');

  const { id } = useParams();

  //get user ip
  useEffect(() => {

    axios.get('https://geolocation-db.com/json/').then(res => {
      setIp(res.data.IPv4);
    }).catch(err => {
      console.log(err)
    })

  }, []);

  //determinates if user has already visited the page
  useEffect(() => {

    if (localStorage.getItem('eventsList') != null) {
      if (localStorage.getItem('eventsList')[id] != null) {
        setHasAlreadyLogged(true);
        setUserName(localStorage.getItem('eventsList')[id]);
      }
    }

  }, [id]);

  //get event info
  useEffect(() => {
    axios.get(`/api/v1/event/${id}`).then(res => {
      setEventName(res.data.name);
      setAvailableDates(res.data.days);
    }).catch(error => {
      console.log(error)
    });
  }, [id]);

  //updates datas in database
  useEffect(() => {

    if (sendingData) {

      for (let i = 0; i < choosenDays.length; i++) {
        choosenDays[i] = dateToFormat(choosenDays[i]);
      }

      axios.post('/api/v1/partecipants', {
        ip: ip,
        name: userName,
        available: choosenDays,
        eventId: id
      }).then(res => {
        setSendingData(false);
        if (localStorage.getItem('eventsList') != null) {
          let newEventList = localStorage.getItem('eventsList');
          newEventList[id] = userName;
          localStorage.setItem('eventsList', newEventList);
        } else {
          let newEventList = {};
          newEventList[id] = userName;
          localStorage.setItem('eventsList', newEventList);
        }
        console.log("sfaccim ce l'abbiamo fatta")
      }).catch(error => {
        console.log(error)
      });
    }

  }, [sendingData, setSendingData, choosenDays, eventName, ip, id, userName]);

  return (
    <div className={classes.container}>
      <Label>What's your name?</Label>
      <TextInput value={userName} disabled={hasAlreadyLogged} setValue={setUserName} />
      <Label>When are you available for "{eventName}" ?</Label>
      <AvailableDays
        choosenDays={choosenDays}
        setChoosenDays={setChoosenDays}
        availableDates={availableDates}
      />
      <Button className={classes.sendButton} onClick={() => setSendingData(true)}>Send</Button>
      <p>or</p>
      <Button className={classes.resultsButton} isPrimary={false}>
        Show results
      </Button>
    </div>
  );
};

export default Vote;
