import {
  useParams,
  useLocation,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../../api";
import css from "./MovieDetailsPage.module.css";
import { MdStarRate } from "react-icons/md";
import toast from "react-hot-toast";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch {
        toast.error("Failed to fetch movie details.");
      }
    };
    getMovie();
  }, [movieId]);

  if (!movie) return <p className={css.loading}>Loading...</p>;

  const backLinkHref = location.state?.from ?? "/movies";
  const backLinkText =
    location.state?.from?.pathname === "/"
      ? "← Back to Home"
      : "← Back to Search Results";

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const production = movie?.production_companies?.map((item) => (
    <li key={item.id}>{item.name}</li>
  ));

  return (
    <div className={css.wrapper}>
      <Link to={backLinkHref} className={css.backBtn}>
        {backLinkText}
      </Link>
      <div className={css.mainInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <ul className={css.details}>
          <li className={css.listItem}>
            <h2 className={css.title}>
              {movie.title} [{movie.release_date.slice(0, 4)}]
            </h2>
          </li>
          <li className={css.listItem}>
            <strong>Overview:</strong>
            <br />
            {movie.overview}
          </li>
          <li className={css.listItem}>
            <strong>Production Studios:</strong>
            <br />
            {production.length > 0 ? (
              <ul>{production}</ul>
            ) : (
              "No production data available"
            )}
          </li>
          {movie.budget > 0 && (
            <li className={css.listItem}>
              <strong>Budget:</strong>
              <br />$ {movie.budget.toLocaleString("ru-RU")}
            </li>
          )}
          {movie.vote_average > 0 && (
            <li className={css.listItem}>
              <strong>Rating:</strong>
              <br />
              <div>
                <MdStarRate size={12} />
                {movie.vote_average}
              </div>
            </li>
          )}
          <li className={css.listItem}>
            {movie.homepage && <a href={movie.homepage}>Watch It Now</a>}
          </li>
        </ul>
      </div>
      <div className={css.additionalInfo}>
        <h3>Additional Information:</h3>
        <ul className={css.list}>
          <li>
            <NavLink
              to="cast"
              state={{ from: backLinkHref }}
              className={buildLinkClass}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              state={{ from: backLinkHref }}
              className={buildLinkClass}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
