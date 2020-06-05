import React from 'react';
import './MainContent.scss';
import Slideshow from '../Slideshow/Slideshow';

const MainContent = () => {
  const images = [
    {
      url: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      url: 'https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg'
    },
    {
      url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&w=1000&q=80'
    }
  ];
  return (
    <div className="main-content">
      <Slideshow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">Pagination</div>
      </div>
      {/* Grid Component */}
    </div>
  );
};

export default MainContent;
