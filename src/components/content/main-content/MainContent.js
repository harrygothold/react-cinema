import React, { useState } from 'react';
import './MainContent.scss';
import Slideshow from '../Slideshow/Slideshow';
import Pagination from '../pagination/Pagination';
import images from './images';

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (type) => {
    if (type === 'prev' && currentPage >= 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div className="main-content">
      <Slideshow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <Pagination paginate={paginate} currentPage={currentPage} totalPages={10} />
        </div>
      </div>
      {/* Grid Component */}
    </div>
  );
};

export default MainContent;
