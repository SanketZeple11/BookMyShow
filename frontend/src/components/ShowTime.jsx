import { useNavigate } from "react-router-dom";

const ShowTime = ({ show, theatre }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <h3>{theatre?.name}</h3>
      <p>{theatre?.location}</p>
      <p><strong>{new Date(show.start_time).toLocaleString()}</strong></p>
      <p>Seats Available: <strong>{show.available_seats}</strong></p>
      <button onClick={() => navigate(`/booking/${show.id}`)} style={styles.bookBtn}>
        Book Now
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    backgroundColor: "#f8f9fa",
  },
  bookBtn: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default ShowTime;
