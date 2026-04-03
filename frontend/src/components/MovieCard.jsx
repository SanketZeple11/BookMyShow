import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>{movie.language}</p>
      <p>{movie.duration} mins</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    width: "200px",
    cursor: "pointer",
  },
};

export default MovieCard;