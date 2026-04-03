import API from "./client";

export const getMovies = async () => {
  const response = await API.get("/movies");
  return response.data;
};