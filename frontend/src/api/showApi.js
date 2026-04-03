import API from "./client";

export const getShowsByMovie = async (movieId) => {
  const response = await API.get(`/shows?movie_id=${movieId}`);
  return response.data;
};