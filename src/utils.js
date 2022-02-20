export const dateToFormat = (date) => {
  const day = new Date(date);
  return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
};
