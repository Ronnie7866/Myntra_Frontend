import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Make sure to install axios

// Async thunks
export const fetchCart = createAsyncThunk(
  "bag/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/getCartByUserId/1`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToBag = createAsyncThunk(
  "bag/addToBag",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      // Use URLSearchParams to send data as form data
      const params = new URLSearchParams();
      params.append('userId', userId);
      params.append('productId', productId);
      params.append('quantity', quantity);

      const response = await axios.post(
        "http://localhost:8080/api/cart",
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding to bag:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromBag = createAsyncThunk(
  "bag/removeFromBag",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      await axios.post(`/api/cart/remove?userId=${userId}&productId=${productId}&quantity=${quantity}`);
      return { productId, quantity };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "bag/updateQuantity",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/cart?userId=${userId}&productId=${productId}&quantity=${quantity}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const bagSlice = createSlice({
  name: "bag",
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.cartProducts;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToBag.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromBag.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.product.id === action.payload.productId);
        if (index !== -1) {
          if (state.items[index].quantity <= action.payload.quantity) {
            state.items.splice(index, 1);
          } else {
            state.items[index].quantity -= action.payload.quantity;
          }
        }
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.product.id === action.payload.product.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default bagSlice.reducer;