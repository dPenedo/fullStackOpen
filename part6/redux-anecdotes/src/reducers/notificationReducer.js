import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "reducer",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export const showNotification = (message, duration = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export const { setNotification, clearNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
