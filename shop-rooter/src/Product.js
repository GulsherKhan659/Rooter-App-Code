import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './config';
import { Container, Row } from 'react-bootstrap';
import ProductDetail from './ProductDetail';
import PriceSection from './PriceSection';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;


  return (
    <main>
      <Container className="my-5">
        <Row>
          <ProductDetail 
            image={API_BASE_URL+"/"+ product.mainImage.replace("\\", "/")}
            description={product.description} 
            productName={product.productName} 
            slider={product.sliderImages.map(img => img.replace("\\", "/"))}
          />
          <PriceSection prices={product.prices} requiredFields={product.checkboxes} product={product}/>
        </Row>
      </Container>
    </main>
  );
};

export default Product;
