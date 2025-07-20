import { createSlice } from "@reduxjs/toolkit";
import { getAlbumData } from "../Thunks/album";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    albumData: [],
    error: false,
    pending: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbumData.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getAlbumData.fulfilled, (state, action) => {
      state.pending = false;
      state.albumData = action.payload || [];
    });
    builder.addCase(getAlbumData.rejected, (state) => {
      state.error = true;
    });
  },
});
export default albumSlice.reducer;
