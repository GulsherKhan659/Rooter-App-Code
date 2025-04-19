import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCarousel from './component/ProductCarousel';
import RupeeIcon from './assets/images/icon/green-rupee.svg';
import DeliveryIcon from './assets/images/icon/delivery.svg';
import VerifiedIcon from './assets/images/icon/verified.svg';

const ProductDetail = ({ image, productName, description, slider }) => {
  return (
    <Col md={6}>
      <Row>
        <Col className="product-container-scroll">
          <Row className="align-items-center">
            <Col md={3}>
              <img
                style={{ borderRadius: '15px' }}
                width="100%"
                src={image} 
                alt="Product"
              />
            </Col>
            <Col md={8}>
              <div className="company-name">Krafton</div>
              <h4 className="product-name">{productName}</h4> 
              <div className="d-flex">
                <span className="me-2 text-success cashback">
                  <img width="20" height="20" src={RupeeIcon} alt="Rupee Icon" /> 10% Cashback
                </span>
                <span className="mx-2">
                  <img width="20" height="20" src={DeliveryIcon} alt="Delivery Icon" /> Instant
                </span>
                <span className="ms-2">
                  <img width="20" height="20" src={VerifiedIcon} alt="Verified Icon" /> Verified
                </span>
              </div>
            </Col>
            <Col md={1}>
            </Col>
          </Row>
          <Row className="my-5">
            <Col md={12}>
              <ProductCarousel sliderImg={slider} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="card px-3 py-2">
                <h4>Product Description</h4>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductDetail;
