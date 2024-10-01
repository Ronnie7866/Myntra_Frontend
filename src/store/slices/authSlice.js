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

      const { token, userDTO } = response.data;

      // Store both token and userDTO in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userDTO));
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

const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  addressList: [],
  defaultPhoneNumber: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser, // Initialise user from localStorage
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,
    error: null,
  },
  reducers: {

    clearError: (state) => {
      state.error = null;
    },
    // Add the setAuthenticatedUser reducer
    setAuthenticatedUser: (state, action) => {
      state.user = action.payload.userDTO;
      state.token = action.payload.token;
      state.isAuthenticated = true;
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
        localStorage.removeItem("user");
      });
  },
});

export const { clearError, setAuthenticatedUser } = authSlice.actions;
export default authSlice;
