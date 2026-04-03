import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowsByMovie } from "../api/showApi";

const MovieDetails = () => {
  const { id } = useParams();
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShows();
  }, [id]);

  const fetchShows = async () => {
    try {
      const data = await getShowsByMovie(id);
      setShows(data);
    } catch (error) {
      console.error("Error fetching shows", error);
    }
  };

  const handleBooking = (showId) => {
    navigate(`/booking/${showId}`);
  };

  return (
    <div>
      <h1>Available Shows</h1>

      {shows.length === 0 ? (
        <p>No shows available</p>
      ) : (
        shows.map((show) => (
          <div key={show.id} style={styles.card}>
            <p><strong>Theatre ID:</strong> {show.theatre_id}</p>
            <p><strong>Time:</strong> {new Date(show.start_time).toLocaleString()}</p>
            <p><strong>Seats Available:</strong> {show.available_seats}</p>

            <button onClick={() => handleBooking(show.id)}>
              Book Now
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const handleBooking = (showId) => {
  alert(`Navigate to booking for show ${showId}`);
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
  },
};

export default MovieDetails;