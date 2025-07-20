import { createSlice } from "@reduxjs/toolkit";
import {
  addComments,
  deleteComments,
  editComment,
  getCommentsData,
} from "../Thunks/commentsThunk";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    commentsData: [],
    error: false,
    pending: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsData.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCommentsData.fulfilled, (state, action) => {
        state.pending = false;
        state.commentsData = action.payload;
      })
      .addCase(getCommentsData.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.commentsData.unshift({
          id: action.payload.id || Date.now(),
          name: action.payload.title,
          email: action.payload.email,
          body: action.payload.body,
        });
      });
    builder.addCase(deleteComments.fulfilled, (state, action) => {
      state.commentsData = state.commentsData.filter(
        (val) => val.id !== action.payload.id
      );
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      const idx = state.commentsData.findIndex(
        (val) => val.id === action.payload.id
      );
      if (idx !== -1) {
        state.commentsData[idx] = {
          ...state.commentsData[idx],
          userId: action.payload.userId,
          name: action.payload.name,
          body: action.payload.body,
        };
      }
    });
  },
});

export default commentsSlice.reducer;

//     builder.addCase(deleteComments.fulfilled, (state, action) => {
//         state.commentsData = state.commentsData.filter(
//           (val) => val.id !== action.payload.id)

// }),
