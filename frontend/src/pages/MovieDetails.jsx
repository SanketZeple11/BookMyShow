import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovies } from "../api/movieApi";
import { getShowsByMovie } from "../api/showApi";
import { getTheatres } from "../api/theatreApi";
import ShowTime from "../components/ShowTime";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [theatres, setTheatres] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch movie details
      const moviesData = await getMovies();
      const currentMovie = moviesData.find(m => m.id === parseInt(id));
      setMovie(currentMovie);

      // Fetch shows for this movie
      const showsData = await getShowsByMovie(id);
      setShows(showsData);

      // Fetch theatres
      const theatresData = await getTheatres();
      const theatreMap = {};
      theatresData.forEach(t => {
        theatreMap[t.id] = t;
      });
      setTheatres(theatreMap);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!movie) return <p style={styles.notFound}>Movie not found</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/")} style={styles.backBtn}>← Back</button>
      
      <div style={styles.movieHeader}>
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p style={styles.movieMeta}>
          <strong>Duration:</strong> {movie.duration} mins | 
          <strong> Language:</strong> {movie.language} | 
          <strong> Genre:</strong> {movie.genre}
        </p>
      </div>

      <h2>Select Show & Theatre</h2>
      {shows.length === 0 ? (
        <p>No shows available</p>
      ) : (
        <div style={styles.showsGrid}>
          {shows.map((show) => (
            <ShowTime 
              key={show.id} 
              show={show} 
              theatre={theatres[show.theatre_id]}
            />
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
  movieHeader: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  movieMeta: {
    color: "#666",
    fontSize: "14px",
    marginTop: "10px",
  },
  showsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    padding: "40px",
  },
  notFound: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
    padding: "40px",
  },
};

export default MovieDetails;