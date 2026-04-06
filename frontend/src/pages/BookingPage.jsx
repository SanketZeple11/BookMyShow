import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeats } from "../api/seatApi";
import { createBooking } from "../api/bookingApi";
import Seat from "../components/Seat";

const BookingPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchSeats();
  }, [showId]);

  const fetchSeats = async () => {
    try {
      setLoading(true);
      const data = await getSeats(showId);
      setSeats(data);
    } catch (error) {
      console.error("Error fetching seats:", error);
      setMessage("❌ Failed to load seats");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
    setMessage(""); // Clear message when seat is selected
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setMessage("❌ Please select at least one seat");
      return;
    }

    try {
      const payload = {
        show_id: parseInt(showId),
        seats: selectedSeats,
      };

      const response = await createBooking(payload);
      setBooking(response);
      setMessage(`✅ Booking successful! Confirmation ID: ${response.id}`);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.detail || "Booking failed. Please try again.";
      setMessage(`❌ ${errMsg}`);
    }
  };

  if (loading) {
    return <div style={styles.container}><p>Loading seats...</p></div>;
  }

  // Organize seats by row
  const seatsByRow = {};
  seats.forEach((seat) => {
    const row = seat.seat_number.charAt(0);
    if (!seatsByRow[row]) {
      seatsByRow[row] = [];
    }
    seatsByRow[row].push(seat);
  });

  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <h1>Select Seats</h1>

      <div style={styles.legendContainer}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendBox, backgroundColor: "#90EE90" }}></div>
          <span>Available</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendBox, backgroundColor: "#FF6B6B" }}></div>
          <span>Booked</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendBox, backgroundColor: "#4A90E2" }}></div>
          <span>Selected</span>
        </div>
      </div>

      <div style={styles.screenContainer}>
        <div style={styles.screen}>SCREEN</div>
      </div>

      <div style={styles.seatsContainer}>
        {sortedRows.map((row) => (
          <div key={row} style={styles.seatRow}>
            <span style={styles.rowLabel}>{row}</span>
            <div style={styles.rowSeats}>
              {seatsByRow[row].map((seat) => (
                <Seat
                  key={seat.seat_number}
                  seat={seat}
                  selected={selectedSeats.includes(seat.seat_number)}
                  onSelect={handleSeatClick}
                />
              ))}
            </div>
            <span style={styles.rowLabel}>{row}</span>
          </div>
        ))}
      </div>

      <div style={styles.summaryContainer}>
        <div style={styles.summaryCard}>
          <h2>Booking Summary</h2>
          <p><strong>Show ID:</strong> {showId}</p>
          <p><strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</p>
          <p><strong>Total Seats:</strong> {selectedSeats.length}</p>
          <p><strong>Price:</strong> ₹{selectedSeats.length * 200}</p>

          {message && (
            <p style={{
              ...styles.message,
              color: message.includes("❌") ? "#d32f2f" : "#388e3c",
              backgroundColor: message.includes("❌") ? "#ffebee" : "#e8f5e9",
            }}>
              {message}
            </p>
          )}

          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0 || booking}
            style={{
              ...styles.bookBtn,
              opacity: selectedSeats.length === 0 || booking ? 0.5 : 1,
              cursor: selectedSeats.length === 0 || booking ? "not-allowed" : "pointer",
            }}
          >
            {booking ? "✅ Booking Confirmed!" : `Confirm Booking`}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
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
  legendContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    marginBottom: "30px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  legendBox: {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
  },
  screenContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  screen: {
    backgroundColor: "#333",
    color: "white",
    padding: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "200px",
    margin: "0 auto",
  },
  seatsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  seatRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  rowLabel: {
    fontWeight: "bold",
    minWidth: "30px",
    textAlign: "center",
  },
  rowSeats: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "5px",
  },
  summaryContainer: {
    display: "flex",
    justifyContent: "center",
  },
  summaryCard: {
    border: "2px solid #007bff",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minWidth: "300px",
  },
  message: {
    padding: "12px",
    borderRadius: "4px",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "14px",
  },
  bookBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
    transition: "background-color 0.3s ease",
  },
};

export default BookingPage;