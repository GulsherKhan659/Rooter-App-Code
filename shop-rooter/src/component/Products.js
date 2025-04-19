import React, { useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { WalletContext } from '../contextApi/contextProvider';


const Products = () => {
  const { products } = useContext(WalletContext); 

  return (
    <Container>
      <Row>
        <h5 className="mt-4">Products for you</h5>
      </Row>
      <Row className="mt-2">
        {products.map(product => (
          <ProductCard
            key={product._id}
            image={`/${product.mainImage.replace("\\", "/")}`}
            title={product.productName}
            productId={product._id}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Products;
