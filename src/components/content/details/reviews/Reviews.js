import React from 'react';
import './Reviews.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';

const Reviews = ({ movie }) => {
  const { results } = movie[4];
  return (
    <>
      <div className="movie-reviews">
        <div className="div-title">Reviews {results.length > 0 && results.length}</div>
        {results.length > 0 ? (
          results.map((data) => (
            <div className="reviews" key={uuidV4()}>
              <h3>{data.author}</h3>
              <div>{data.content}</div>
            </div>
          ))
        ) : (
          <p>No Reviews To Show</p>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

Reviews.propTypes = {
  movie: PropTypes.array
};

export default connect(mapStateToProps)(Reviews);
