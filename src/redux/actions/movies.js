import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE, LOAD_MORE_RESULTS, MOVIE_TYPE } from '../types';
import { getData } from '../../services/movies';

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

export const setResponsePageNumber = (page, totalPages) => async (dispatch) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => (dispatch) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
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
