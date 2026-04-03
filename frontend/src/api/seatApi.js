import API from "./client";

export const getSeats = async (showId) => {
  const res = await API.get(`/shows/${showId}/seats`);
  return res.data;
};