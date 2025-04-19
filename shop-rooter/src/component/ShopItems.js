import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const shopItems = [
  { id: 1, name: "BGMI UC", price: 75, cashback: "10%" },
  { id: 2, name: "Valorant Points", price: 400, cashback: "10%" },
  { id: 3, name: "Amazon Shopping Gift", price: 10, cashback: "10%" }
];

const ShopItems = () => {
  return (
    <div>
      <h3>Use Rooter Wallet</h3>
      <Row>
        {shopItems.map((item) => (
          <Col md={4} key={item.id} className="mb-3">
            <Card className="bg-secondary text-white">
              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className="fw-bold">₹{item.price}</Card.Text>
                <Card.Text className="text-warning">{item.cashback} Cashback</Card.Text>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopItems;
