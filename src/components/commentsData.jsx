import { useDispatch, useSelector } from "react-redux";
import {
  addComments,
  editComment,
  getCommentsData,
} from "../Thunks/commentsThunk";
import { FaPlusSquare } from "react-icons/fa";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../Thunks/userPosts";
import { getUserData } from "../Thunks/userThunk";
import { deleteComments } from "../Thunks/commentsThunk";
import { useState } from "react";

export default function CommentsUi() {
  const { commentsData, error, pending } = useSelector(
    (state) => state.comments
  );
  const { postData } = useSelector((state) => state.post);
  const { data } = useSelector((state) => state.user);
  const [compInptl, setCompInptl] = useState("");
  const [compInpBl, setCompInpBl] = useState("");
  const [compInpEm, setCompInpEm] = useState("");
  const [hideBtn, setHideBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserPosts({ id }));
    dispatch(getUserData({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    const postId = Number(id);
    if (postId >= 1 && postId <= 100) {
      dispatch(getCommentsData({ id: postId }));
    } else {
      console.error("Invalid post ID:", postId);
    }
  }, [dispatch, id]);

  const posts = postData.find((val) => val.id === Number(id));
  const userData = data.find((val) => val.id === Number(id));

  const handleDltComs = (id) => {
    dispatch(deleteComments({ id }));
  };

  const handleAddEditComp = (userId, title, email, body) => {
    if (editBtn) {
      dispatch(editComment({ id: editId, name: title, body }));
    } else {
      dispatch(addComments({ userId, title, email, body }));
    }
  };

  return (
    <>
      <div className="px-15 py-10">
        <div>
          {posts && (
            <div>
              <p className="font-semibold text-[26px] font-[sans-serif]">
                {posts.title}
              </p>
              {userData && (
                <p className="text-sm mt-3 ">
                  Post By:{" "}
                  <span className="text-blue-600 cursor-pointer">
                    {" "}
                    {userData.name}
                  </span>
                </p>
              )}
              <p className="text-sm mt-3 mb-3 border-b-1 border-gray-300 pb-2">
                {posts.body}
              </p>
            </div>
          )}
        </div>

        <p className="text-[28px] font-semibold font-[sans-serif]">Comments</p>
        <p className="text-lg flex items-center gap-1 font-semibold border-b-1 border-gray-300 pb-2 mt-3 font-[Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;]">
          Add Comments{" "}
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
                handleAddEditComp(Number(id), compInptl, compInpEm, compInpBl);
                setCompInptl("");
                setCompInpBl("");
                setCompInpEm("");
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
                value={compInptl}
                onChange={(e) => setCompInptl(e.target.value)}
                className="border border-gray-300 rounded-sm w-[95%] h-9"
                required
              />
              <label htmlFor="email" className="relative top-3">
                Email
              </label>
              <input
                type="email"
                name=""
                id="email"
                value={compInpEm}
                onChange={(e) => setCompInpEm(e.target.value)}
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
                value={compInpBl}
                onChange={(e) => setCompInpBl(e.target.value)}
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

        {commentsData &&
          commentsData.map((item) => (
            <div key={item.id} className="border-b-1 border-gray-300 pb-2 ">
              <p className="mt-2 text-[25px] font-semibold font-[Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif] mt-5">
                {item.name}
              </p>
              <p className="fron-[sans-serif] mt-2 text-sm">{item.email}</p>
              <p className="fron-[sans-serif] mt-2 text-sm">{item.body}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setHideBtn(true);
                    setCompInptl(item.name);
                    setCompInpBl(item.body);
                    setCompInpEm(item.email);
                    setEditBtn(true);
                    setEditId(item.id);
                  }}
                  className="px-5 py-1 font-semibold text-white rounded-sm bg-teal-500 hover:bg-teal-600"
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 font-semibold text-white rounded-sm bg-red-500 hover:bg-red-600"
                  onClick={() => handleDltComs(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
