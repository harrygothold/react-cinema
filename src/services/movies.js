import axios from 'axios';

const REQUEST_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
const API_KEY = process.env.REACT_APP_API_SECRET;

export const getData = async (type, page) => {
  const res = await axios.get(`${REQUEST_URL}/movie/${type}?api_key=${API_KEY}&language='en-UK'&page=${page}`);
  return res;
};

export const searchMovies = async (query) => {
  const res = await axios.get(`${REQUEST_URL}/search/movie/?api_key=${API_KEY}&language='en-UK'&query=${query}`);
  return res;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${REQUEST_URL}/movie/${id}?api_key=${API_KEY}&language='en-UK'`);
  return res;
};

export const getMovieCredits = async (id) => {
  const res = await axios.get(`${REQUEST_URL}/movie/${id}/credits?api_key=${API_KEY}&language='en-UK'`);
  return res;
};

export const getMovieImages = async (id) => {
  const res = await axios.get(`${REQUEST_URL}/movie/${id}/images?api_key=${API_KEY}&language=en-UK&include_image_language=en`);
  return res;
};

export const getMovieVideos = async (id) => {
  const res = await axios.get(`${REQUEST_URL}/movie/${id}/videos?api_key=${API_KEY}&language='en-UK'`);
  return res;
};

export const getMovieReviews = async (id, page = 1) => {
  const res = await axios.get(`${REQUEST_URL}/movie/${id}/reviews?api_key=${API_KEY}&language='en-UK'&page=${page}`);
  return res;
};
