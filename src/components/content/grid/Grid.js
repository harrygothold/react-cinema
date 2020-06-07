import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Grid.scss';
import Rating from '../rating/Rating';
import { connect } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { IMAGE_URL } from '../../../services/movies';
import LazyImage from '../../LazyImage/LazyImage';

const Grid = ({ list }) => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    setMovieData(list);
  }, [list]);
  return (
    <>
      <div className="grid">
        {movieData.map((data) => (
          <div key={uuidV4()}>
            <LazyImage className="grid-cell" src={`${IMAGE_URL}${data.poster_path}`} alt="placeholder">
              <div className="grid-read-more">
                <button className="grid-cell-button">Read More</button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">{data.title}</span>
                <div className="grid-detail-rating">
                  <Rating rating={data.vote_average} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">{data.vote_average}</div>
                </div>
              </div>
            </LazyImage>
          </div>
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list
});

export default connect(mapStateToProps, {})(Grid);
