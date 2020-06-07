import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/cinema-logo.svg';
import './Header.scss';
import { connect } from 'react-redux';
import { getMovies, setMovieType, setResponsePageNumber } from '../../redux/actions/movies';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = ({ getMovies, setMovieType, page, totalPages, list }) => {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now_playing');

  const toggleMenu = () => {
    setMenuClass(!menuClass);
    setNavClass(!navClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  useEffect(() => {
    getMovies(type, page);
    setResponsePageNumber(page, totalPages);
    // eslint-disable-next-line
  }, [type]);

  const setMovieTypeUrl = (type) => {
    setType(type);
    setMovieType(type);
  };

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
            <img src={logo} alt="Logo" />
          </div>
          <div className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} id="header-mobile-menu" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
            {HEADER_LIST.map((data) => (
              <li key={data.id} className={data.type === type ? 'header-nav-item active-item' : 'header-nav-item'} onClick={() => setMovieTypeUrl(data.type)}>
                <span className="header-list-name">
                  <i className={data.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name">{data.name}</span>
              </li>
            ))}
            <input type="text" className="search-input" placeholder="Search For A Movie" />
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages
});

Header.propTypes = {
  list: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired,
  setMovieType: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { getMovies, setMovieType, setResponsePageNumber })(Header);
