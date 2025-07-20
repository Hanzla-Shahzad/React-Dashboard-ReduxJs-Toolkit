import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiData } from "../services/jsonData";

export const getUserPosts = createAsyncThunk(
  "post/getUserPosts",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await apiData.get(`/users/${id}/posts`);
      console.log("posts======>", res.data);
      if (!res.data || res.data.length === 0) {
        throw new Error("No posts found for user");
      }
      return res.data;
    } catch (error) {
      console.log(
        "getUserPosts========>error",
        error.response?.data || error.message
      );
      return rejectWithValue(error.message || "Failed to fetch posts");
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await apiData.delete(`/posts/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  "addPost",
  async ({ userId, title, body }) => {
    try {
      const res = await apiData.post(`/posts`, { userId, title, body });
      return res.data;
    } catch (error) {
      console.error("addPost error:", error);
      throw error;
    }
  }
);

export const editPost = createAsyncThunk(
  "editPost",
  async ({ id, title, body }) => {
    try {
      const res = await apiData.patch(`posts/${id}`, { title, body });
      return res.data;
    } catch (error) {
      console.log("editData=====>error", error);
    }
  }
);
