export const dateToFormat = (date) => {
  const day = new Date(date);
  return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
};

export const formatToDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${month}/${day}&${year}`);
};
