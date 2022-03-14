import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventBanner from "../ui/EventBanner";
import ResultTab from "../ui/ResultTab";
import Section from "../container/Section";
import classes from "./Results.module.css";
import { formatToDate, sortDates } from "../../utils";
import Share from "../ui/Share";

const extractResultsFromData = (data) => {
  sortDates(data.days);
  return data.days.map((day) => {
    return {
      date: day,
      nonParts: Object.keys(data.partecipants).reduce((arr, partecipant) => {
        if (!data.partecipants[partecipant].find((date) => date === day))
          arr.push(partecipant);
        return arr;
      }, []),
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
        setData(response.data);
        const result = extractResultsFromData(response.data);
        console.log(result);
        setResults(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  // let perfectDays = null;
  // let notPerfectDays = null;

  // useEffect(() => {
  //   perfectDays = results.filter((obj) => obj.nonParts.length === 0);
  //   notPerfectDays = results.filter((obj) => !perfectDays[obj.date]);
  //   console.log(perfectDays, notPerfectDays);
  // }, [results]);

  return (
    <>
      <EventBanner eventName={data.name} />
      <div className={classes.container}>
        <div className={classes.resultsContainer}>
          {results.some((obj) => obj.nonParts.length === 0) && (
            <Section
              className={classes.section}
              label="These days are perfect! 🎉"
            >
              {results.map(
                (obj) =>
                  obj.nonParts.length === 0 && (
                    <ResultTab
                      key={obj.date}
                      date={formatToDate(obj.date)}
                      parts={Object.keys(data.partecipants)}
                    />
                  )
              )}
            </Section>
          )}
          {results.some((obj) => obj.nonParts.length > 0) && (
            <Section
              className={classes.section}
              label="Someone's missing these days😢"
            >
              {results.map(
                (obj) =>
                  obj.nonParts.length > 0 && (
                    <ResultTab
                      key={obj.date}
                      nonParts={obj.nonParts}
                      parts={Object.keys(data.partecipants)}
                      date={formatToDate(obj.date)}
                    />
                  )
              )}
            </Section>
          )}
        </div>
      </div>
      <Share url={`https://pick-a-day.netlify.app/${id}`} />
    </>
  );
};

export default Results;
