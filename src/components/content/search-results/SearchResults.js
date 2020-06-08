import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../grid/Grid.scss';
import './SearchResults.scss';
import Rating from '../rating/Rating';
import { connect } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { IMAGE_URL } from '../../../services/movies';
import LazyImage from '../../LazyImage/LazyImage';

const SearchResults = ({ searchResult, searchQuery }) => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);
  return (
    <div className="search-keyword">
      <div className="grid-search-title">
        <span className="grid-text1">You searched for:</span> <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map((data) => (
          <div key={uuidV4()}>
            {data.poster_path && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  searchResult: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  searchQuery: state.movies.searchQuery
});

export default connect(mapStateToProps, {})(SearchResults);
