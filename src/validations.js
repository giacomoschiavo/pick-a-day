import { checkPreviousDays } from "./utils";
import { filterSelected } from "./utils";

////////// CREATE.JS
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
//////////

////////// VOTE.JS
export const checkUsername = (userName) => {
  if (userName.trim() === "") {
    return "Please, write your name🖊️";
  }
  if (userName.length < 3 || userName.length > 15) {
    return "Please, choose a name between 3 and 15 characters📏";
  }
  return false;
};

export const checkChosenDays = (chosenDays) => {
  // if (filterSelected(chosenDays).length < 1 && **!hasAlreadyLogged**) {
  //   setError("Please, choose at least one day🐣");
  //   setShowPopup(true);
  //   return true;
  // }
  if (filterSelected(chosenDays).length < 1) {
    return "Please, choose at least one day🐣";
  }
  return false;
};
//////////
