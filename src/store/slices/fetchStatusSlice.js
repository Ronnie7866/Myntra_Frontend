import { createSlice } from "@reduxjs/toolkit";

// Create Slice
const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    fetchDone: false, // false: PENDING and true: DONE
    currentlyFetching: false,
  },
  reducers: {
    markFetchDone: (state) => {
      state.fetchDone = true; // Correctly update the state
    },
    markFetchingStarted: (state) => {
      state.currentlyFetching = true; // Correctly update the state
    },
    markFetchingFinished: (state) => {
      state.currentlyFetching = false; // Correctly update the state
    },
  },
});

export const fetchStatusActions = fetchStatusSlice.actions;

export default fetchStatusSlice;
