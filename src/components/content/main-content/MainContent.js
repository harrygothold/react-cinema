import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MainContent.scss';
import Slideshow from '../Slideshow/Slideshow';
import Pagination from '../pagination/Pagination';
import Grid from '../grid/Grid';
import { connect } from 'react-redux';
import { IMAGE_URL } from '../../../services/movies';
import { getMovies, setResponsePageNumber } from '../../../redux/actions/movies';

const MainContent = ({ list, movieType, totalPages, page, getMovies, setResponsePageNumber }) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [images, setImages] = useState([]);

  const paginate = (type) => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    setCurrentPage(pageNumber);
    setResponsePageNumber(pageNumber, totalPages);
    getMovies(movieType, pageNumber);
  };

  const randomMovieImage = list.sort(() => Math.random() - Math.random()).slice(0, 4);

  const HEADER_TYPE = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming'
  };

  useEffect(() => {
    if (randomMovieImage.length) {
      const IMAGES = randomMovieImage.map((movie, i) => ({
        id: i + 1,
        url: `${IMAGE_URL}/${movie.backdrop_path}`
      }));
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, totalPages]);

  return (
    <div className="main-content">
      <Slideshow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
      <Grid />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array.isRequired,
  movieType: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  getMovies: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType,
  totalPages: state.movies.totalPages,
  page: state.movies.page
});

export default connect(mapStateToProps, { getMovies, setResponsePageNumber })(MainContent);
