import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../Thunks/userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    error: false,
    pending: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.pending = false;
      state.data = action.payload;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.error = true;
    });
  },
});
export default userSlice.reducer;
