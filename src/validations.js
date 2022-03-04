import { checkPreviousDays } from "./utils";

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
