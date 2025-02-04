import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../api";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        const { results, total_pages } = await fetchMovies(query, page);
        setMovies(results);
        setTotalPages(total_pages);
        if (results.length === 0) {
          toast.error("No results found");
        }
      } catch {
        toast.error("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.search.value.trim();
    if (inputValue) {
      setSearchParams({ query: inputValue });
      form.reset();
    }
  };

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.button} type="submit">
          <IoSearch size={24} />
        </button>
      </form>
      {isLoading && <Loader />}
      <MovieList
        movies={movies}
        totalPages={totalPages}
        page={page}
        onClick={() => setPage((prev) => prev + 1)}
      />
    </div>
  );
};

export default MoviesPage;
