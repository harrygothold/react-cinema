import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../content/spinner/Spinner';
import { connect } from 'react-redux';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';

const Main = ({ loadMoreMovies, page, totalPages, setResponsePageNumber, movieType }) => {
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
      {loading ? <Spinner /> : <MainContent />}
      <div ref={bottomLineRef}></div>
    </div>
  );
};

Main.propTypes = {
  loadMoreMovies: PropTypes.func.isRequired,
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  setResponsePageNumber: PropTypes.func.isRequired,
  movieType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber })(Main);
