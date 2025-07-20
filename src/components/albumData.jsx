import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbumData } from "../Thunks/album";

export default function AlbumUi() {
  const { albumData, error, pending } = useSelector((state) => state.album);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumData());
  }, []);
}
