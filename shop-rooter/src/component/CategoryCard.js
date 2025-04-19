import React from 'react';
import { Col } from 'react-bootstrap';
import { API_BASE_URL } from '../config';

const CategoryCard = ({ image, title }) => {
  let imageURL = API_BASE_URL + image;
  // alert(image);
  return (
    <Col md={1} className="text-center">
      <div className="categorysize mx-2">
        <img src={imageURL} alt={title} />
        <p className="mt-2">{title}</p>
      </div>
    </Col>
  );
};

export default CategoryCard;
