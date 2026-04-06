import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await API.get("/bookings/my-bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setMessage("❌ Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/")} style={styles.backBtn}>
        ← Back to Home
      </button>

      <h1>My Bookings</h1>

      {message && (
        <p style={{ ...styles.message, color: "#d32f2f" }}>
          {message}
        </p>
      )}

      {bookings.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No bookings found</p>
          <button
            onClick={() => navigate("/")}
            style={styles.browseBtn}
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div style={styles.bookingsGrid}>
          {bookings.map((booking) => (
            <div key={booking.id} style={styles.bookingCard}>
              <h3>Booking #{booking.id}</h3>
              <p><strong>Show ID:</strong> {booking.show_id}</p>
              <p><strong>Seats Booked:</strong> {booking.seats_booked}</p>
              <p><strong>Total Price:</strong> ₹{booking.seats_booked * 200}</p>
              <p><strong>Booked On:</strong> {new Date(booking.booked_at).toLocaleString()}</p>
              <p style={styles.status}>✅ Confirmed</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
  },
  backBtn: {
    padding: "8px 16px",
    marginBottom: "20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  message: {
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "20px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px",
  },
  browseBtn: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
  bookingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  bookingCard: {
    border: "2px solid #28a745",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f8f9fa",
  },
  status: {
    color: "#28a745",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default MyBookings;
