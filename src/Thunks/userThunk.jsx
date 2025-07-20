import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiData } from "../services/jsonData";

export const getUserData = createAsyncThunk("getUserData", async () => {
  try {
    const res = await apiData.get(`/users`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("getUserData======>error", error);
  }
});
