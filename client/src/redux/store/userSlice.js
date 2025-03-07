import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabaseClient";

// Fetch Users from Supabase
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return data;
});

// Add User to Supabase
export const addUser = createAsyncThunk("user/addUser", async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();
  if (error) {
    throw error;
  }
  return data[0];
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
