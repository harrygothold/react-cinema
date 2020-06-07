import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Slideshow.scss';

const Slideshow = ({ images, auto, showArrows }) => {
  const [state, setState] = useState({
    slideshow: images[0],
    slideIndex: 0
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderInterval, setSliderInterval] = useState(0);

  const { slideIndex, slideshow } = state;
  let currentSlideIndex = 0;

  useEffect(() => {
    setState({
      ...state,
      slideIndex: 0,
      slideshow: images[0]
    });
    if (auto) {
      const timeInterval = setInterval(() => {
        autoMoveSlide();
      }, 5000);
      setSliderInterval(timeInterval);
      return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
      };
    }
    // eslint-disable-next-line
  }, [images]);

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;
    setState({
      ...state,
      slideshow: images[currentSlideIndex],
      slideIndex: currentSlideIndex
    });
  };

  const moveSliderWithArrows = (type) => {
    let index = currentIndex;
    if (type === 'prev') {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
    } else {
      if (currentIndex < images.length) {
        index += 1;
      }
      if (index === images.length) {
        index = 0;
      }
    }
    setCurrentIndex(index);
    setState({
      ...state,
      slideshow: images[index],
      slideIndex: index
    });
  };

  const RenderArrows = () => (
    <div className="slider-arrows">
      <div className="slider-arrow slider-arrow--left" onClick={() => moveSliderWithArrows('prev')} />
      <div className="slider-arrow slider-arrow--right" onClick={() => moveSliderWithArrows('next')} />
    </div>
  );

  const Indicators = ({ currentSlide }) => {
    const indicatorsList = images.map((slide, i) => {
      const btnClasses = i === currentSlide ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={btnClasses} key={i} />;
    });
    return <div className="slider-nav">{indicatorsList}</div>;
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">{images && images.length && slideshow && <div className="slider-image" style={{ backgroundImage: `url(${slideshow.url})` }}></div>}</div>
        <Indicators currentSlide={slideIndex} />
        {showArrows && <RenderArrows />}
      </div>
    </>
  );
};

Slideshow.propTypes = {
  currentSlide: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  auto: PropTypes.bool.isRequired,
  showArrows: PropTypes.bool.isRequired
};

export default Slideshow;
