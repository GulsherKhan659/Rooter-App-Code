import { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import arrowIcon from "./assets/images/icon/arrow.svg";
import PaymentModal from "./component/PaymentModal";
import LoginModal from "./component/GoogleLogin";
import { useParams } from "react-router-dom";
import { WalletContext } from "./contextApi/contextProvider";

function BillAmount({ selectedPrice, walletBalance, requiredFields }) {
  const { productId } = useParams();
  const { userDetails, placeOrder } = useContext(WalletContext);
  const [walletbalance, setWalletBalance] = useState(null);
  const [isCheckbox, setCheckBox] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setWalletBalance(walletBalance);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [walletBalance]);

  const handleCheckboxChange = (event) => {
    setCheckBox(event.target.checked);
  };

  const handlePayClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const orderData = {
      productId,
      amount: selectedPrice.price,
      payment: isCheckbox ? "viaWallet" : "viaBank",
      paymentDetails: paymentData,
    };

    console.log("Placing Order with Data:", orderData);
    try {
      await placeOrder(orderData);
      setShowPaymentModal(false); 
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <Row>
        <Col className="text-center">
          <div>
            <input
              type="checkbox"
              checked={isCheckbox}
              onChange={handleCheckboxChange}
              disabled={walletBalance === 0 || selectedPrice.price > walletBalance}
              style={{ margin: "0 5px 0 0" }}
            />
            ₹{walletBalance}
          </div>
          <div className="d-flex align-items-center justify-content-center text-center">
            via Wallet <img className="mx-2" width={8} height={8} src={arrowIcon} />
          </div>
        </Col>
        <Col>
          <Button className="btn btn-primary form-control" onClick={handlePayClick} disabled={isSubmitting}>
            Pay ₹ {selectedPrice.price}
          </Button>
        </Col>
      </Row>
      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} setUser={setUser} />
      <PaymentModal
        show={showPaymentModal}
        handleClose={() => setShowPaymentModal(false)}
        requiredFields={requiredFields}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default BillAmount;
