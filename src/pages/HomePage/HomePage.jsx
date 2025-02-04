import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import toast from "react-hot-toast";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch {
        toast.error("Failed to fetch movies.");
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h2 className={css.header}>Trending Today</h2>
      <MovieList movies={movies} />
    </div>
  );
};
export default HomePage;
