import React, { useState } from 'react';
import './story.css';

const StoryList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["First slide", "Second slide", "Third slide", "Fourth slide"];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div className="story-list-container">
      <button
        className="prev-button"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        Prev
      </button>

      <div className="slides-wrapper">{slides[currentSlide]}</div>

      <button
        className="next-button"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        Next
      </button>

      <div className="pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`slider-dot ${index === currentSlide ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
