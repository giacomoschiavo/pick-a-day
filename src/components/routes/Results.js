import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventBanner from "../ui/EventBanner";
import Label from "../ui/Label";
import ResultTab from "../ui/ResultTab";
import classes from "./Results.module.css";

const extractResultsFromData = (data) => {
  return data.days.map((day) => {
    return {
      date: day,
      nonParts: Object.keys(data.partecipants).reduce((arr, partecipant) => {
        if (!data.partecipants[partecipant].find((date) => date === day))
          arr.push(partecipant);
        return arr;
      }, []),
      tot: Object.keys(data.partecipants).length,
    };
  });
};

const Results = () => {
  const { id } = useParams();

  const [results, setResults] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/v1/event/${id}`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        const result = extractResultsFromData(response.data);
        setResults(result);
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <div className={classes.container}>
      <EventBanner eventName={data.name} />
      <Label>Results for {data.name}</Label>
      <div className={classes.resultsTab}>
        {results.map(
          (obj) =>
            obj.nonParts.length === 0 && (
              <ResultTab
                key={obj.date}
                date={obj.date}
                ratio={`${obj.nonParts.length}/${obj.tot}`}
                success
              />
            )
        )}
      </div>
      <Label>Other days</Label>
      <div className={classes.resultsTab}>
        {results.map(
          (obj) =>
            obj.nonParts.length > 0 && (
              <ResultTab
                key={obj.date}
                date={obj.date}
                ratio={`${obj.nonParts.length}/${obj.tot}`}
                nonParts={obj.nonParts}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Results;
