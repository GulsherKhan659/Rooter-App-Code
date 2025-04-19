import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Categories from './component/Categories';
import Products from './component/Products';
import SliderImage1 from './assets/images/slider/xxxhdpi1.jpg';
import SliderImage2 from './assets/images/slider/xxxhdpi2.jpg';
import SliderImage3 from './assets/images/slider/xxxhdpi3.jpg';
import SliderImage4 from './assets/images/slider/xxxhdpi4.jpg';

// SliderImage Images
const sliderImages = [
    SliderImage1,
    SliderImage2,
    SliderImage3,
    SliderImage4
];

const Home = () => {
  return (
    <main>

      <Container className="my-5">
        <Row>
          <Col md={12}>
            <Carousel>
              {sliderImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>

      <Categories />

      <Products />
    </main>
  );
};

export default Home;
