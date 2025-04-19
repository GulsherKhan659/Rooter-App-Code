import React from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import playstoreIcon from './assets/images/icon/playstore.svg';
import applestoreIcon from './assets/images/icon/applestore.svg';
import qrCode from './assets/images/footer/qr.png';

const Footer = () => {
  return (
    <footer className="bg-light">
      <Container className="py-5">
        <Row>
          {/* Brand Section */}
          <Col md={3}>
            <div className="footer-logo">
              <h1>BRAND</h1>
            </div>
            <p>India’s Largest Game Streaming & Esports Platform</p>
          </Col>

          {/* Download App Section */}
          <Col md={3}>
            <h5 className="mb-4">Download App</h5>
            <Button variant="light" className="d-flex align-items-center mt-1">
              <img src={playstoreIcon} width="15" height="15" alt="Google Play" className="mx-1" />
              <span>Google Play</span>
            </Button>
            <Button variant="light" className="d-flex align-items-center mt-1">
              <img src={applestoreIcon} width="15" height="15" alt="Apple Store" className="mx-1" />
              <span>Apple Store</span>
            </Button>
            <div className="qr-div mt-2">
              <img width="60%" src={qrCode} alt="QR Code" />
            </div>
          </Col>

          {/* Company Section */}
          <Col md={2}>
            <h5 className="mb-4">Company</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">About Us</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">Work With Us</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">Media</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Help Section */}
          <Col md={2}>
            <h5 className="mb-4">Help</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">Terms of Use</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">Privacy Policy</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Contact Section */}
          <Col md={2}>
            <h5 className="mb-4">Reach Us at:</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">support@rooter.io</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">+91 11-41000921</ListGroup.Item>
              <ListGroup.Item className="border-0 p-0 my-2 bg-transparent">
                <span>Community Centre, 2nd Floor, 55, East of Kailash, New Delhi, Delhi 110065</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <hr />
      <p className="text-center">
        © 2023, BRAND Sports Technologies Pvt. Ltd.
      </p>
    </footer>
  );
};

export default Footer;
