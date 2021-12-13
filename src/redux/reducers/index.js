const reducer = (
  state = { userName: "mike", error: "hi", userId: "w" },
  action
) => {
  switch (action.type) {
    case "CONSOLE":
      console.log("in reducer", action.payload);
      return state;
    case "TRYPOST":
      return { ...action.payload, canYouSeeMe: action.payload.firstName };
    case "REGISTER":
      return {
        ...state,
        ...action.payload,
      };
    case "CHECK_DB_AVAILABILITY":
      return { ...state, available: action.payload.available };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "LOG_NUTRITION":
      return { ...state, error: action.payload?.error };
    default:
      return state;
  }
};

export default reducer;
