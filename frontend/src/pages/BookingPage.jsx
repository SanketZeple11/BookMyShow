// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { createBooking } from "../api/bookingApi";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeats } from "../api/seatApi";
import { createBooking } from "../api/bookingApi";
import Seat from "../components/Seat";

const BookingPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  // const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    const data = await getSeats(showId);
    setSeats(data);
  };


  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    try {
      const payload = {
        show_id: parseInt(showId),
        seats: seats,
      };

      const response = await createBooking(payload);

      setMessage(`✅ Booking successful! ID: ${response.id}`);
    } catch (error) {
      console.error(error);

      const errMsg =
        error.response?.data?.detail || "Booking failed";

      setMessage(`❌ ${errMsg}`);
    }
  };

  return (
    <div>
      <h1>Book Tickets</h1>

      <div style={styles.card}>
        <p><strong>Show ID:</strong> {showId}</p>

        <label>Number of Seats:</label>
        <input
          type="number"
          value={seats}
          min={1}
          onChange={(e) => setSeats(Number(e.target.value))}
        />

        <br /><br />

        <button onClick={handleBooking}>
          Confirm Booking
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    width: "300px",
  },
};

export default BookingPage;