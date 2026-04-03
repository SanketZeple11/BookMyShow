import { useEffect, useState } from "react";
import { getMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  return (
    <div>
      <h1>Now Showing</h1>

      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
};

export default Home;