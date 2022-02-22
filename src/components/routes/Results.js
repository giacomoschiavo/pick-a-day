import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Label from "../ui/Label";
import ResultTab from "../ui/ResultTab";
import classes from "./Results.module.css";

// const data = {
//   name: "ciao",
//   days: [
//     "1/2/2022",
//     "2/2/2022",
//     "3/2/2022",
//     "4/2/2022",
//     "5/2/2022",
//     "7/2/2022",
//     "8/2/2022",
//   ],
//   participants: {
//     gigi: ["2/2/2022", "3/2/2022", "4/2/2022", "5/2/2022"],
//     lado: ["1/2/2022", "4/2/2022", "7/2/2022"],
//     berto: ["2/2/2022", "3/2/2022", "4/2/2022", "8/2/2022"],
//     vidio: ["2/2/2022", "4/2/2022", "5/2/2022"],
//     sarto: ["1/2/2022", "3/2/2022", "4/2/2022", "5/2/2022"],
//   },
// };

const extractResultsFromData = (data) => {
  return data.days.map((day) => {
    return {
      date: day,
      nonParts: Object.keys(data.participants).reduce((arr, partecipant) => {
        if (!data.participants[partecipant].find((date) => date === day))
          arr.push(partecipant);
        return arr;
      }, []),
      tot: Object.keys(data.participants).length,
    };
  });
};

const Results = () => {

  const { id } = useParams();

  const [results, setResults] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`/api/v1/event/${id}`)
      .then(function (response) {
        setData(response.data);
        const result = extractResultsFromData(response.data);
        setResults(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <div className={classes.container}>
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
