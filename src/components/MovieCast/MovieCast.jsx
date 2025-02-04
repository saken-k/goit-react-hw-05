import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import css from "./MovieCast.module.css";
import toast from "react-hot-toast";
import { FaUserAstronaut } from "react-icons/fa6";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch {
        toast.error("Failed to fetch cast.");
      }
    };
    getCast();
  }, [movieId]);

  if (!cast.length)
    return <p className={css.noData}>No cast information available.</p>;

  return (
    <ul className={css.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.castItem}>
          {actor.profile_path ? (
            <img
              className={css.photo}
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              // width={200}
              // height={300}
              alt={actor.name}
            />
          ) : (
            <FaUserAstronaut size={200} />
          )}
          <div className={css.info}>
            <p className={css.name}>{actor.name}</p>
            <p>as {actor.character || "themselves"}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
