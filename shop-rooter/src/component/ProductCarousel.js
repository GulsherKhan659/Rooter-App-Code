import React from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselImage1 from '../assets/images/slider/xxxhdpi1.jpg';
import CarouselImage2 from '../assets/images/slider/xxxhdpi2.jpg';
import CarouselImage3 from '../assets/images/slider/xxxhdpi3.jpg';
import CarouselImage4 from '../assets/images/slider/xxxhdpi4.jpg';
const sliderImages = [
  CarouselImage1,
  CarouselImage2,
  CarouselImage3,
  CarouselImage4,
];

const ProductCarousel = ({sliderImg}) => {
  return (
    <Carousel>
      {sliderImages.map((image, index) => (
        <Carousel.Item key={index}>
          <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
