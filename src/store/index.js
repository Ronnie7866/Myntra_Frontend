import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./slices/itemsSlice.js";
import fetchStatusSlice from "./slices/fetchStatusSlice.js";
import bagSlice from "./slices/bagSlice.js";
import authSlice from "./slices/authSlice.js";
import imageSlice from "./slices/imageSlice.js";

// Create Store
const myntraStore = configureStore({
  reducer: {
    items: itemsSlice, // Directly using the imported slice
    fetchStatus: fetchStatusSlice.reducer, // Directly using the imported slice
    bag: bagSlice,
    auth: authSlice.reducer,
    images: imageSlice.reducer,
  },
});

export default myntraStore;
