// src/Hooks/useFetchSavedItems.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSavedPosts, fetchSavedProjects } from "../Redux/Slices/SaveItemSlice";

const useFetchSavedItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedPosts());
    dispatch(fetchSavedProjects());
  }, [dispatch]);
};

export default useFetchSavedItems;


