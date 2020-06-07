import React from 'react';
import './Grid.scss';
import images from '../main-content/images';
import Rating from '../rating/Rating';

const Grid = () => {
  return (
    <>
      <div className="grid">
        {images.map((image) => (
          <div key={image.url}>
            <div className="grid-cell" style={{ backgroundImage: `url(${image.url})` }}>
              <div className="grid-read-more">
                <button className="grid-cell-button">Read More</button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">Mission Impossible</span>
                <div className="grid-detail-rating">
                  <Rating rating={image.rating} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">{image.rating}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
