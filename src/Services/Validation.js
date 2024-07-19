import errorMessages from "../Constants/ErrorMessages";
import { usernameRegex } from "../Constants/Regex";

export const validateRequest = (username, password) => {
  let errorMsgObj = {};
  let showErrorFlag = false;

  if (!username) {
    errorMsgObj = {
      ...errorMsgObj,
      usernameError: errorMessages.olmIdRequired,
    };
    showErrorFlag = true;
  } else if (!usernameRegex.test(username)) {
    errorMsgObj = {
      ...errorMsgObj,
      usernameError: errorMessages.olmIdInvalid,
    };
    showErrorFlag = true;
  } else {
    errorMsgObj = { ...errorMsgObj, usernameError: "" };
  }

  if (!password) {
    errorMsgObj = {
      ...errorMsgObj,
      passwordError: errorMessages.passwordRequired,
    };
    showErrorFlag = true;
  } else {
    errorMsgObj = { ...errorMsgObj, passwordError: "" };
  }

  return { errorMsgObj, showErrorFlag };
};
