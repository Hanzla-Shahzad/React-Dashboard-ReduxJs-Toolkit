import { useDispatch, useSelector } from "react-redux";
import { FaPlusSquare } from "react-icons/fa";
import {
  addPost,
  deletePost,
  editPost,
  getUserPosts,
} from "../Thunks/userPosts";
import { getUserData } from "../Thunks/userThunk";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getCommentsData } from "../Thunks/commentsThunk";
import { getAlbumData } from "../Thunks/album";

export default function PostsData() {
  const { postData, error, pending } = useSelector((state) => state.post);
  const { albumData } = useSelector((state) => state.album);
  const [postInpTl, setPostInpTl] = useState("");
  const [postInpBd, setPostInpTitleBd] = useState("");
  const [hideBtn, setHideBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(false);

  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getCommentsData({ id: id }));
    dispatch(getAlbumData({ id: id }));
  }, [dispatch, id]);

  // Then: Once we have the user ID, fetch posts
  useEffect(() => {
    dispatch(getUserPosts({ id: id }));
  }, [dispatch, id]);

  const user = data.find((val) => val.id === Number(id));
  const userAlbums = albumData.filter((val) => val.userId === Number(id));

  const handleDltPost = (id) => {
    dispatch(deletePost(id));
  };

  const handleAddEditPost = (userId, title, body) => {
    if (editBtn) {
      dispatch(editPost({ userId, title, body }));
    }
    dispatch(addPost({ userId, title, body }));
  };

  return (
    <>
      <div className="px-15 py-5 ">
        {pending && <p>Loading...</p>}
        {/* {error && <p>{error}</p>} */}
        <div>
          {user && (
            <div key={user.id}>
              <p className="text-3xl mb-5 py-4 font-[sans-serif] border-b-1 border-gray-300 font-semibold">
                {user.name}
              </p>
              <p className="text-sm mb-2 font-[Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;]">
                User Name: {user.username}
              </p>
              <p className="text-sm mb-2">Email: {user.email}</p>
              <p className="text-sm mb-2">Phone: {user.phone}</p>
              <p className="text-sm border-b-1 border-gray-300 pb-2 mb-2">
                Website: {user.website}
              </p>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-6">
            <div className=" border-1 border-gray-200 shadow-2xl rounded-sm w-1/2 p-4 relative bottom-2">
              <p className="text-2xl font-semibold font-[Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;]">
                Posts
              </p>
              <p className="text-lg flex items-center gap-1 font-semibold border-b-1 border-gray-300 pb-2 mt-3 font-[Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;]">
                Add Post{" "}
                <span>
                  <FaPlusSquare
                    onClick={() => setHideBtn((p) => !p)}
                    className="text-teal-500 relative top-0.5 cursor-pointer hover:text-teal-600"
                  />
                </span>
              </p>
              {hideBtn && (
                <div className="mt-5">
                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddEditPost(Number(id), postInpTl, postInpBd);
                      setPostInpTl("");
                      setPostInpTitleBd("");
                    }}
                    className="flex flex-col items-baseline gap-3"
                  >
                    <label htmlFor="title" className="relative top-3">
                      Title
                    </label>
                    <input
                      type="text"
                      name=""
                      id="title"
                      value={postInpTl}
                      onChange={(e) => setPostInpTl(e.target.value)}
                      className="border border-gray-300 rounded-sm w-[95%] h-9"
                      required
                    />
                    <label htmlFor="body" className="relative top-2">
                      Body
                    </label>
                    <input
                      type="text"
                      name=""
                      id="body"
                      value={postInpBd}
                      onChange={(e) => setPostInpTitleBd(e.target.value)}
                      className="border border-gray-200 rounded-sm w-[95%] h-12"
                      required
                    />
                    <button
                      type="submit"
                      className="px-5 py-1 bg-teal-500 rounded-sm"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}

              {postData
                ? postData.map((item) => (
                    <div
                      key={item.id}
                      className=" border-b-1 border-gray-300 py-3 mt-2"
                    >
                      <p className="text-blue-400 cursor-pointer hover:text-blue-500 text-sm">
                        <NavLink to={`/comments/${item.id}`}>
                          {item.title}
                        </NavLink>
                      </p>
                      <p className="text-sm">{item.body}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="px-4 py-1 bg-[#00b5ad] text-white rounded-sm"
                          onClick={() => {
                            setHideBtn(true);
                            setPostInpTl(item.title);
                            setPostInpTitleBd(item.body);
                            setEditBtn(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-1 bg-red-500 text-white rounded-sm"
                          onClick={() => handleDltPost(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                : !pending && <p>No posts found.</p>}
            </div>

            <div>
              <div className="mt-10 border-1 border-gray-300 rounded-md w-[500px] p-5 ">
                <h2 className=" font-semibold mb-2 text-3xl font-[Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;]">
                  Albums
                </h2>
                {userAlbums.length > 0 ? (
                  userAlbums.map((item) => (
                    <div
                      key={item.id}
                      className="text-[#4183c4] font-semibold text-2xl mb-6 font-[Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;] cursor-pointer"
                    >
                      <NavLink to={`/albums/photos/${item.id}`}>
                        <p>{item.title}</p>
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <p>No albums found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
