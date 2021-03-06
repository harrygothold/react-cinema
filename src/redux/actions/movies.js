import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE, LOAD_MORE_RESULTS, MOVIE_TYPE, SEARCH_RESULT, SEARCH_QUERY, MOVIE_DETAILS, CLEAR_MOVIE_DETAILS } from '../types';
import { getData, searchMovies, getMovieDetails, getMovieCredits, getMovieImages, getMovieVideos, getMovieReviews } from '../../services/movies';

const dispatchMethod = (type, payload, dispatch) => {
  dispatch({
    type,
    payload
  });
};

export const getMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const { results, payload } = await getMovieRequest(type, pageNumber);
    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const loadMoreMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const { results, payload } = await getMovieRequest(type, pageNumber);
    dispatchMethod(LOAD_MORE_RESULTS, { list: results, page: payload.page, totalPages: payload.totalPages }, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const searchResult = (query) => async (dispatch) => {
  try {
    if (query !== '') {
      const movies = await searchMovies(query);
      const { results } = movies.data;
      dispatchMethod(SEARCH_RESULT, results, dispatch);
    } else {
      dispatchMethod(SEARCH_RESULT, [], dispatch);
    }
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    const details = await getMovieDetails(id);
    const credits = await getMovieCredits(id);
    const images = await getMovieImages(id);
    const videos = await getMovieVideos(id);
    const reviews = await getMovieReviews(id);
    const res = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);
    dispatchMethod(MOVIE_DETAILS, res, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => (dispatch) => {
  dispatchMethod(CLEAR_MOVIE_DETAILS, [], dispatch);
};

export const setResponsePageNumber = (page, totalPages) => async (dispatch) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => (dispatch) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

export const searchQuery = (query) => (dispatch) => {
  dispatchMethod(SEARCH_QUERY, query, dispatch);
};

const getMovieRequest = async (type, pageNumber) => {
  const movies = await getData(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};
