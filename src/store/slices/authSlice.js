import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/api"

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/authenticate",
        credentials,
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      addressList: [],
      defaultPhoneNumber: "",
    },
    token: localStorage.getItem("token") || null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.userDTO;
        state.token = action.payload.token;
        state.user.role = action.payload.userDTO.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userDTO;
        state.token = action.payload.token;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          firstName: "",
          lastName: "",
          email: "",
          role: "",
        };
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice;
