import { createSlice } from "@reduxjs/toolkit";
import {
  deletePost,
  getUserPosts,
  addPost,
  editPost,
} from "../Thunks/userPosts";

const userPostsSlice = createSlice({
  name: "post",
  initialState: {
    postData: [],
    error: false,
    pending: true,
    deletingId: null,
    adding: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.pending = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.pending = false;
        state.postData = action.payload || [];
      })
      .addCase(getUserPosts.rejected, (state) => {
        state.error = true;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletingId = null;
        state.postData = state.postData.filter(
          (val) => val.id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state) => {
        state.deletingId = null;
        state.error = true;
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.postData.unshift({
          id: action.payload.id,
          title: action.payload.title,
          body: action.payload.body,
          userId: action.payload.userId,
        });
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const idx = state.postData.findIndex(
          (val) => val.id === action.payload.id
        );
        state.postData[idx] = {
          ...state.postData[idx],
          title: action.payload.title,
          body: action.payload.body,
          userId: action.payload.userId,
        };
      });
  },
});
export default userPostsSlice.reducer;
