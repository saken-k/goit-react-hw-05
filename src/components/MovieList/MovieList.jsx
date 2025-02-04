import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies, onClick, totalPages, page }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
      {movies.length !== 0 && totalPages > 1 && page < totalPages && (
        <button className={css.button} onClick={onClick}>
          See more results
        </button>
      )}
    </div>
  );
};
export default MovieList;
