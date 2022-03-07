export const Colors = {
  white: "#e7ecef",
  black: "#000000",
  primary: "#139a43",
  grey: "#9E8576",
};

export const dateToFormat = (date) => {
  const day = new Date(date);
  return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
};

//
export const formatToDate = (dateString) => {
  if (typeof dateString !== "string") throw new Error("String date needed");
  if (!dateString.split("/")) return dateString;
  const [day, month, year] = dateString.split("/");
  return new Date(`${month}/${day}/${year}`);
};

export const createDate = (day, month, year) =>
  new Date(`${day}/${month}/${year}`);

export const createFormattedDate = (day, month, year) =>
  `${day}/${month}/${year}`;

// usata solo per array di date non formattate
export const divideInMonths = (dates) => {
  if (!Array.isArray(dates)) throw new Error("Array of dates needed");
  const formattedDates = dates.map(formatToDate);
  formattedDates.sort(function (a, b) {
    return new Date(a) - new Date(b);
  });
  const organized = {};
  formattedDates.forEach((date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (organized[year]) {
      if (organized[year][month]) organized[year][month].push(date.getDate());
      else organized[year][month] = [date.getDate()];
    } else {
      organized[year] = {};
      organized[year][month] = [date.getDate()];
    }
  });
  return organized;
};

// ritorna date selezionate in un array
// dateObj structure be like => {'12/09/2022': true, '13/09/2022': false}
// where true means the date was selected
export const filterSelected = (dateObj) => {
  return Object.keys(dateObj).reduce((arr, date) => {
    if (dateObj[date]) arr.push(date);
    return arr;
  }, []);
};

// get a capital letter month
export const getCapitalLetterMonth = (n) => {
  // get the first of the month
  const date = new Date(`${n}/1/2022`);
  const month = date.toLocaleString("default", { month: "long" });
  // CAPITALIZE
  return month.charAt(0).toUpperCase() + month.slice(1);
};

// checks if all the days in the array are not before today (not included)
// * days are in getTime() format (ms) = [ 1645657200000, 1645743600000]
export const checkPreviousDays = (days) => {
  const actualTime = new Date();
  // parte da mezzanotte, il giorno stesso puo essere programmato
  const today = new Date(
    `${
      actualTime.getMonth() + 1
    }/${actualTime.getDate()}/${actualTime.getFullYear()}`
  ).getTime();
  // ritorna true se almeno un giorno e' precedente a questo
  return days.some((day) => day < today);
};

// takes every input validation function and if at least one is not passed
// then error and popup state are updates
// * needs setError and showPopup function
// * every validation function must return a string or false
// * args contains all the validation function
export const checkErrorsAndShowPopup = (
  setError,
  setShowPopup,
  ...validationErrors
) => {
  let errorThrown = false;
  validationErrors.forEach((messageError) => {
    if (!messageError || errorThrown) return;
    setError(messageError);
    setShowPopup(true);
    errorThrown = true;
  });
  return errorThrown;
};
