import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiData } from "../services/jsonData";

const getAlbumPhotos = createAsyncThunk("getAlbumPhotos", async ({ id }) => {
  try {
    const res = await apiData.get(`/albums/${id}/photos`);
    console.log("photos=======>", res.data);
    return res.data;
  } catch (error) {
    console.log("getAlbumPhotos=======>error", error);
  }
});
export default getAlbumPhotos;
