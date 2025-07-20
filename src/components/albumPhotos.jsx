import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAlbumPhotos from "../Thunks/albuPhotos";
import { NavLink, useParams } from "react-router-dom";
import { getAlbumData } from "../Thunks/album";
import { getUserData } from "../Thunks/userThunk";

export default function AlbumPhotos() {
  const { albumPhotos, error, pending } = useSelector((state) => state.photos);
  const { albumData } = useSelector((state) => state.album);
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const album = albumData.find((val) => val.id === Number(id));
  useEffect(() => {
    dispatch(getAlbumData({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAlbumPhotos({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (album && album.userId) {
      dispatch(getUserData({ id: album.userId }));
    }
  }, [dispatch, id, album]);

  const user = album ? data.find((val) => val.id === album.userId) : null;

  return (
    <>
      <div className="px-15 mt-5">
        {album && (
          <div key={album.userId}>
            <p className="text-2xl font-semibold font-[sans-serif]">
              {album.title}
            </p>
            <p className="flex gap-0.5 border-b-1 border-gray-200 pb-2 mt-3.5">
              Album By:{" "}
              <span className="text-blue-400 ">
                {user && (
                  <NavLink
                    to={`/posts/${album.userId}`}
                    className="text-blue-400"
                  >
                    {user.name}
                  </NavLink>
                )}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="flex items-baseline px-15 mt-3">
        <div className="">
          {albumPhotos &&
            albumPhotos.map((item) => (
              <div key={item.id} className="flex mb-10 text-sm">
                <img src={`https://placehold.co/150x150/${item.id}`} />
                <p>{item.title}</p>
              </div>
            ))}
        </div>

        <div>
          {albumPhotos &&
            albumPhotos.map((item) => (
              <div key={item.id} className="mb-3">
                <p className="font-semibold text-xl font-[sans-serif]">
                  {item.title}
                </p>
                <p>
                  Photo Url:{" "}
                  <span className="text-blue-400 cursor-pointer">
                    {item.url}{" "}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
