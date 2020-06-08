import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../content/spinner/Spinner';
import SearchResults from '../content/search-results/SearchResults';
import { connect } from 'react-redux';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';

const Main = ({ loadMoreMovies, page, totalPages, setResponsePageNumber, movieType, searchResults }) => {
  const mainRef = useRef();
  const bottomLineRef = useRef();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setResponsePageNumber(currentPage, totalPages);
    // eslint-disable-next-line
  }, [currentPage, totalPages]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      fetchData();
    }
  };

  return (
    <div onScroll={() => handleScroll()} ref={mainRef} className="main">
      {loading ? <Spinner /> : searchResults.length !== 0 ? <SearchResults /> : <MainContent />}
      <div ref={bottomLineRef}></div>
    </div>
  );
};

Main.propTypes = {
  loadMoreMovies: PropTypes.func.isRequired,
  list: PropTypes.array,
  searchResults: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  setResponsePageNumber: PropTypes.func.isRequired,
  movieType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  searchResults: state.movies.searchResult
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber })(Main);
