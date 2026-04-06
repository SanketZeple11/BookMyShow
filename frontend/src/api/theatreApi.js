import API from "./client";

export const getTheatres = async () => {
  const response = await API.get("/theatres");
  return response.data;
};

export const getTheatreById = async (theatreId) => {
  const response = await API.get(`/theatres/${theatreId}`);
  return response.data;
};
