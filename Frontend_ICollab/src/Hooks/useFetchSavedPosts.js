import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedPosts } from "../Redux/Slices/PostSlice";

const useFetchSavedPosts = () => {
  const dispatch = useDispatch();
  const { savePost, error, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchSavedPosts());
  }, [dispatch]);

  return { savePost, loading, error };
};

export default useFetchSavedPosts;
// This custom hook fetches saved posts from the Redux store and dispatches the action to fetch them when the component mounts.