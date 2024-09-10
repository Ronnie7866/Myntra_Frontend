import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./slices/itemsSlice.js";
import fetchStatusSlice from "./slices/fetchStatusSlice.js";
import bagSlice from "./slices/bagSlice.js";
import authSlice from "./slices/authSlice.js";

// Create Store
const myntraStore = configureStore({
  reducer: {
    items: itemsSlice.reducer, // Directly using the imported slice
    fetchStatus: fetchStatusSlice.reducer, // Directly using the imported slice
    bag: bagSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default myntraStore;
