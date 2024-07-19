const errorMessages = {
  //Login Errors
  loginSuccess: "Login successful!",
  wrongCredentials: "Login failed: Check your OLM ID and password.",
  loginError: "An error occurred. Please try again later.",

  //Validation Errors
  olmIdRequired: "OLM ID is required",
  olmIdInvalid: "Please enter a valid OLM ID",
  passwordRequired: "Password is required!",

  //Data Fetching Errors
  dataFetchError: "Error while fetching data",
  addKeyError: "Error while adding key",
  deleteKeyError: "Error while deleting key",
  updateKeyError: "Error while updating key",

  //Key Value empty Error
  keyValueEmptyError: "key and value cannot be empty!",
};

export default errorMessages;
