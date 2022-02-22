export const dateToFormat = (date) => {
  const day = new Date(date);
  return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
};

export const formatToDate = (dateString) => {
  if (typeof dateString !== "string") throw new Error("String date needed");
  if (!dateString.split("/")) return dateString;
  const [day, month, year] = dateString.split("/");
  return new Date(`${month}/${day}&${year}`);
};

// usata solo per array di date
export const divideInMonths = (dates) => {
  if (!Array.isArray(dates)) throw new Error("Array of dates needed");
  const formattedDates = dates.map(formatToDate);
  const organized = {};
  formattedDates.forEach((date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const capitalCaseMonth = month.charAt(0).toUpperCase() + month.slice(1);
    if (organized[year]) {
      if (organized[year][capitalCaseMonth])
        organized[year][capitalCaseMonth].push(date.getDate());
      else organized[year][capitalCaseMonth] = [date.getDate()];
    } else {
      organized[year] = {};
      organized[year][capitalCaseMonth] = [date.getDate()];
    }
  });
  return organized;
};
