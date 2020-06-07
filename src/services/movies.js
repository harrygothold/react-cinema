import axios from 'axios';

const REQUEST_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
const API_KEY = process.env.REACT_APP_API_SECRET;

export const getData = async (type, page) => {
  const res = await axios.get(`${REQUEST_URL}/movie/${type}?api_key=${API_KEY}&language='en-UK'&page=${page}`);
  return res;
};
