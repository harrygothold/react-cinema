import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '../rating/Rating';
import './Details.scss';
import Tabs from '../../tabs/Tabs';
import Overview from './overview/Overview';
import Crew from './crew/Crew';
import Media from './media/Media';
import Reviews from './reviews/Reviews';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../../redux/actions/movies';
import { IMAGE_URL } from '../../../services/movies';
import Spinner from '../spinner/Spinner';

const Details = ({ fetchMovieDetails, movie }) => {
  const [details, setDetails] = useState();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (movie.length === 0) {
      fetchMovieDetails(id);
    }
    setDetails(movie[0]);
    // eslint-disable-next-line
  }, [id, movie]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        details && (
          <div className="movie-container">
            <div className="movie-bg" style={{ backgroundImage: `url(${IMAGE_URL}${details.backdrop_path})` }}></div>
            <div className="movie-overlay"></div>
            <div className="movie-details">
              <div className="movie-image">
                <img src={`${IMAGE_URL}${details.poster_path}`} alt="" />
              </div>
              <div className="movie-body">
                <div className="movie-overview">
                  <div className="title">
                    {details.title} <span>{details.release_date}</span>
                  </div>
                  <div className="movie-genres">
                    <ul className="genres">{details && details.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}</ul>
                  </div>
                  <div className="rating">
                    <Rating totalStars={10} rating={details.vote_average} className="rating-stars" />
                    &nbsp;
                    <span>{details.vote_average}</span> <p>({details.vote_count}) reviews</p>
                  </div>
                  <Tabs>
                    <div label="Overview">
                      <Overview />
                    </div>
                    <div label="Crew">
                      <Crew />
                    </div>
                    <div label="Media">
                      <Media />
                    </div>
                    <div label="Reviews">
                      <Reviews />
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

Details.propTypes = {
  movie: PropTypes.array,
  fetchMovieDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchMovieDetails })(Details);
