export const Colors = {
  white: "#e7ecef",
  black: "#000000",
  primary: "#139a43",
  grey: "#9E8576",
  // transparentPrimary: "rgba(39, 93, 173, 0.5)",
  // verde: 9CFF94
};

export const dateToFormat = (date) => {
  const day = new Date(date);
  return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
};

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

// ritorna date selezionate
export const filterSelected = (dateObj) => {
  return Object.keys(dateObj).reduce((arr, date) => {
    if (dateObj[date]) arr.push(date);
    return arr;
  }, []);
};

export const getCapitalLetterMonth = (n) => {
  const date = new Date(`${n}/1/2022`);
  const month = date.toLocaleString("default", { month: "long" });
  return month.charAt(0).toUpperCase() + month.slice(1);
};

export const checkPreviousDays = (days) => {
  // days = [ 1645657200000, 1645743600000]
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

export const validateEventName = (eventName) => {
  if (eventName.trim() === "") {
    return "Please, choose a name for the event🗒️";
  }
  if (eventName.trim().length < 3 || eventName.trim().length > 25) {
    return "Please, choose a name between 3 and 25 characters🗒️";
  }
  return false;
};

export const validateEventDays = (eventDays) => {
  if (eventDays.length < 2) {
    return "Please, choose at least two days🎲";
  }
  if (eventDays.length > 14) {
    return "Please, you can maximum 14 days📅";
  }
  if (checkPreviousDays(eventDays)) {
    return "Please, choose future dates🔮";
  }
  return false;
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
  let errorThrowned = false;
  validationErrors.forEach((messageError) => {
    if (!messageError || errorThrowned) return;
    setError(messageError);
    setShowPopup(true);
    errorThrowned = true;
  });
  return errorThrowned;
};
