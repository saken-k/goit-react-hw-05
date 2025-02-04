import axios from "axios";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODlkYmU5NDIxZTU0Y2E3MGY0Mjc4ZGYyNjg2MWNlNSIsIm5iZiI6MTczODQxMjU2Ni40NCwic3ViIjoiNjc5ZTEyMTY4MDA4Mjk4NmM4Y2IzY2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gJmdT2U4ZIisS05ggEedadG4NumcJSNZTjbb47HYqJc";
const options = {
  headers: {
    accept: "application/json",
    Authorization: API_TOKEN,
  },
};

export const fetchMovies = async (query, page) => {
  const BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const response = await axios.get(BASE_URL, options);
  return response.data;
};

export const fetchMovieById = async (movieId) => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const response = await axios.get(BASE_URL, options);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(BASE_URL, options);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const response = await axios.get(BASE_URL, options);
  return response.data;
};

export const fetchTrendingMovies = async () => {
  const BASE_URL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const response = await axios.get(BASE_URL, options);
  return response.data;
};
