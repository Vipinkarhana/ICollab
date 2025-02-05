import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { register, login, googleAuth, logout } from "../../services/authService";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await register({ name, email, password });
      if(response.status === 'success') {
        return response.message;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await login({ email, password });
      if(response.status === 'success') {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async ({ credential }, { rejectWithValue }) => {
    try {
      const response = await googleAuth({ credential });
      if(response.status === 'success') {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// LinkedIn login thunk is not implemented here becuse it requires a redirect to the LinkedIn API

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      if(response.status === 'success') {
        return response.message;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Handle all pending actions (for thunks)
    builder.addMatcher(isPending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle all fulfilled actions (for thunks)
    builder.addMatcher(isFulfilled, (state, action) => {
      state.loading = false;
      if (action.type !== "auth/registerUser/fulfilled" && action.type !== "auth/logoutUser/fulfilled") {
        state.userData = action.payload; 
      }
    });

    // Handle all rejected actions (for thunks)
    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export synchronous actions if needed
export default userSlice.reducer;
