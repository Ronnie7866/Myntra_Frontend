import {createSlice} from "@reduxjs/toolkit";

// Load initial bag state from localStorage(or use an empty array if nothing is found)
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("bag");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    return [];
  }
};

// Save bag state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("bag", serializedState);
  } catch (e) {
    console.error("Could not save state to localStorage", e);
  }
};

// Create Slice
// Hold product ids
const bagSlice = createSlice({
  name: "bag",
  initialState: loadState(),
  reducers: {
    addToBag: (state, action) => {
      state.push(action.payload);
      saveState(state);
    },
    removeFromBag: (state, action) => {
      const updatedState = state.filter((itemId) => itemId !== action.payload);
      saveState(updatedState);
      return updatedState;
    },
  },
});

export const bagActions = bagSlice.actions;

export default bagSlice;
