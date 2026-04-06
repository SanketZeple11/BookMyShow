import API from "./client";

export const createBooking = async (payload) => {
  const response = await API.post("/bookings/", payload);
  return response.data;
};