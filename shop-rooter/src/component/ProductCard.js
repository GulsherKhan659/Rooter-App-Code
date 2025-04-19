import React from 'react';
import { Col } from 'react-bootstrap';
import { API_BASE_URL } from '../config';

const ProductCard = ({ image, title,productId }) => {
    return (
      <Col md={2} className="text-center">
        <div className="product-card mx-2">
          <a href={`/products/${encodeURIComponent(productId)}`}>
            <img src={API_BASE_URL+ image} width="100%" alt={title} />
            <p>{title}</p>
          </a>
        </div>
      </Col>
    );
  };
export default ProductCard;
