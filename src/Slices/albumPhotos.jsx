import { createSlice } from "@reduxjs/toolkit";
import getAlbumPhotos from "../Thunks/albuPhotos";

const albumPhotos = createSlice({
  name: "photos",
  initialState: {
    albumPhotos: [],
    error: false,
    pending: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbumPhotos.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getAlbumPhotos.fulfilled, (state, action) => {
      state.pending = false;
      state.albumPhotos = action.payload;
    });
    builder.addCase(getAlbumPhotos.rejected, (state) => {
      state.error = true;
    });
  },
});
export default albumPhotos.reducer;
