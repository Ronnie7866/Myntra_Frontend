import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeItems = createAsyncThunk(
  "items/fetchHomeItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) throw new Error('Server Error');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addInitialItems: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomeItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchHomeItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addInitialItems } = itemsSlice.actions;
export default itemsSlice.reducer;