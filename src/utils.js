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

export const Colors = {
  white: "#F7F5FB",
  black: "#1F2421",
  primary: "#94D4FF",
  grey: "#9E8576",
  // transparentPrimary: "rgba(39, 93, 173, 0.5)",
};
