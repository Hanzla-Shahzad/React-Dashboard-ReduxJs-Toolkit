import { configureStore } from "@reduxjs/toolkit";
import user from "../Slices/userDataSlice";
import post from "../Slices/userPostsSlice";
import comments from "../Slices/commentSlice";
import album from "../Slices/albumSlice";
import photos from "../Slices/albumPhotos";

const store = configureStore({
  reducer: {
    user: user,
    post: post,
    comments: comments,
    album: album,
    photos: photos,
  },
});
export default store;
