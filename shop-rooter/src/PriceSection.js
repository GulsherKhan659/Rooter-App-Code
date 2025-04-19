import React, { useContext, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import BillAmount from "./BillAmount";
import ArrowDown from "./assets/images/icon/arrow.svg";
import { WalletContext } from "./contextApi/contextProvider";


const PriceSection = ({ prices, requiredFields, product }) => {
  const [selectedOption, setSelectedOption] = useState(prices[0]);
  const {walletAmount} = useContext(WalletContext);

  const handleSelect = (price) => {
    setSelectedOption(price);
  };

  return (
    <Col md={6}>
      <Card className="p-2">
        <h6 className="mx-2 mt-3">Select Options</h6>
        <div className="payment-scroll mt-2" style={{fontWeight: 600}}>
          <Row>
            {prices.map((price, index) => (
              <Col md={6} key={index}>
                <Card
                  className={`px-2 pt-2 mt-2 ${
                    selectedOption.quantity === price.quantity ? "border border-3 border-primary shadow" : ""
                  }`}
                  onClick={() => handleSelect(price)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="fs-5 ps-3">
                    {price.quantity} {price.name}
                  </div>
                  <pre className="ps-3">
                    {price.price}
                    <span className="ms-2 text-decoration-line-through">
                      {price.original}
                    </span>
                  </pre>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <BillAmount walletBalance={walletAmount} selectedPrice={selectedOption} requiredFields={requiredFields} />
      </Card>

      <div className="">
        <h5 className="mx-2 mt-4 mb-4">Reviews</h5>

        <div className="mt-1 ">
          <Row>
            <Col md={2}>
              <img
                width={65}
                height={65}
                src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
                class="rounded-circle"
                alt="..."
              ></img>
            </Col>
            <Col md={10}>
              <div className="">
                <h6 className="fw-bold mb-0">Alyia Afl</h6>
                <p className="mb-0 fw-bold" style={{ fontSize: "10px" }}>
                  <small>8 days ago</small>
                </p>
                <p
                  className="mt-1"
                  style={{ lineHeight: "1.15", fontSize: "14px" }}
                >
                  asd asd asd sad as das askasd jkasjdk akjsk asjkjkaskj
                  asjkaskjdjkasdkjasd
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="mt-1 ">
          <Row>
            <Col md={2}>
              <img
                width={65}
                height={65}
                src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
                class="rounded-circle"
                alt="..."
              ></img>
            </Col>
            <Col md={10}>
              <div className="">
                <h6 className="fw-bold mb-0">Alyia Afl</h6>
                <p className="mb-0 fw-bold" style={{ fontSize: "10px" }}>
                  <small>8 days ago</small>
                </p>
                <p
                  className="mt-1"
                  style={{ lineHeight: "1.15", fontSize: "14px" }}
                >
                  asd asd asd sad as das askasd jkasjdk akjsk asjkjkaskj
                  asjkaskjdjkasdkjasd
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <Button className="form-control btn btn-light text-center mt-1">
          View All Review <img width="10" height="10" src={ArrowDown} />
        </Button>
      </div>
    </Col>
  );
};

export default PriceSection;
