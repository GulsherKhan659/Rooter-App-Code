import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../contextApi/contextProvider";

const AddMoney = () => {
  const { addedAmount, walletAmount } = useContext(WalletContext); 
  const [selectedAmount, setSelectedAmount] = useState(250);
  const amounts = [250, 500, 1000];
  const navigate = useNavigate();

  useEffect(() => {}, [selectedAmount]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="bg-dark text-white p-4" style={{ width: "500px", borderRadius: "10px" }}>
        <div className="d-flex align-items-center mb-3">
          <FaLongArrowAltLeft size={24} className="me-2" role="button" onClick={() => { navigate(-1); }} />
          <h5 className="mb-0">Add Money</h5>
        </div>
        <p className="text-muted">Current Balance: ₹{walletAmount}</p>
        <div className="text-center my-4">
          <h2>₹{selectedAmount}</h2>
          <hr className="bg-success w-25 mx-auto" />
          <p className="text-muted">Enter amount between ₹10 - ₹2,00,000.</p>
        </div>
        <Row className="justify-content-center">
          {amounts.map((amount, index) => (
            <Col key={index} xs="auto" className="mb-2">
              <Button
                variant={selectedAmount === amount ? "success" : "outline-secondary"}
                className="px-4 py-2 position-relative"
                onClick={() => setSelectedAmount(amount)}
              >
                ₹{amount}
                {amount === 250 && (
                  <span className="most-popular-badge position-absolute bottom-100 start-50 translate-middle px-3 py-1 rounded">
                    Most Popular 🔥
                  </span>
                )}
              </Button>
            </Col>
          ))}
        </Row>
        <Button variant="success" className="w-100 mt-4 py-2" onClick={() => addedAmount(selectedAmount)}>
          Add Money
        </Button>
      </Card>
    </Container>
  );
};

export default AddMoney;
