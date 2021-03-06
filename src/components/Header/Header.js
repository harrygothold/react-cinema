import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/cinema-logo.svg';
import './Header.scss';
import { connect } from 'react-redux';
import { getMovies, setMovieType, setResponsePageNumber, searchQuery, searchResult, clearMovieDetails } from '../../redux/actions/movies';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

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

const Header = ({ getMovies, setMovieType, page, totalPages, searchQuery, searchResult, clearMovieDetails }) => {
  const history = useHistory();
  const location = useLocation();
  const detailsRoute = useRouteMatch('/:id/:name/details');
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [search, setSearch] = useState('');
  const [disableSearch, setDisableSearch] = useState(false);
  const [type, setType] = useState('now_playing');
  const [hideHeader, setHideHeader] = useState(false);

  const toggleMenu = () => {
    setMenuClass(!menuClass);
    setNavClass(!navClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  const navigateHome = () => {
    clearMovieDetails();
    setDisableSearch(false);
    history.push('/');
  };

  useEffect(() => {
    getMovies(type, page);
    setResponsePageNumber(page, totalPages);
    if (detailsRoute || location.pathname === '/') {
      setHideHeader(true);
    }
    if (location.pathname !== '/' && location.key) {
      setDisableSearch(true);
    }
    // eslint-disable-next-line
  }, [type, location, disableSearch]);

  const setMovieTypeUrl = (type) => {
    setDisableSearch(false);
    if (location.pathname !== '/') {
      clearMovieDetails();
      history.push('/');
      setType(type);
      setMovieType(type);
    } else {
      setType(type);
      setMovieType(type);
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    searchQuery(e.target.value);
    searchResult(e.target.value);
  };

  return (
    <>
      {hideHeader && (
        <div className="header-nav-wrapper">
          <div className="header-bar"></div>
          <div className="header-navbar">
            <div className="header-image" onClick={navigateHome}>
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
              <input onChange={onSearchChange} value={search} type="text" className={`search-input ${disableSearch ? 'disabled' : ''}`} placeholder="Search For A Movie" />
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages
});

Header.propTypes = {
  getMovies: PropTypes.func.isRequired,
  setMovieType: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  searchQuery: PropTypes.func.isRequired,
  searchResult: PropTypes.func.isRequired,
  clearMovieDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getMovies, setMovieType, setResponsePageNumber, searchQuery, searchResult, clearMovieDetails })(Header);
