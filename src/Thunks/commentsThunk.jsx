import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiData } from "../services/jsonData";

export const getCommentsData = createAsyncThunk(
  "getCommentsData",
  async ({ id }, { rejectWithValue }) => {
    try {
      const postId = Number(id);
      if (postId < 1 || postId > 100) {
        return rejectWithValue(
          "Invalid post ID: JSONPlaceholder only supports post IDs 1–100"
        );
      }
      const res = await apiData.get(`/posts/${postId}/comments`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteComments = createAsyncThunk(
  "deleteComments",
  async ({ id }, { rejectWithValue }) => {
    try {
      await apiData.get(`/comments/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addComments = createAsyncThunk(
  "addComments",
  async ({ userId, title, email, body }) => {
    try {
      const res = await apiData.post(`/comments`, {
        userId,
        title,
        email,
        body,
      });
      console.log("addComments====>", res.data);
      return res.data;
    } catch (error) {
      console.log("addComments=====>error", error);
    }
  }
);

export const editComment = createAsyncThunk(
  "editComment",
  async ({ id, name, body }, { rejectWithValue }) => {
    try {
      const res = await apiData.patch(`/comments/${id}`, { name, body });
      return { ...res.data, id };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
