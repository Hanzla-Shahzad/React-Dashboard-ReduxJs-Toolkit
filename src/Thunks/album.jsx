import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiData } from "../services/jsonData";

export const getAlbumData = createAsyncThunk(
  "album/getAlbumData",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await apiData.get(`/users/${id}/albums`);
      console.log("album======>", res.data);
      if (!res.data || res.data.length === 0) {
        throw new Error("No albums found for user");
      }
      return res.data;
    } catch (error) {
      console.log(
        "getAlbumData========>error",
        error.response?.data || error.message
      );
      return rejectWithValue(error.message || "Failed to fetch album data");
    }
  }
);
