import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";
import css from "./MovieReviews.module.css";
import toast from "react-hot-toast";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch {
        toast.error("Failed to fetch reviews.");
      }
    };
    getReviews();
  }, [movieId]);

  if (!reviews.length)
    return <p className={css.noData}>No reviews available.</p>;

  return (
    <ul className={css.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={css.reviewItem}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
