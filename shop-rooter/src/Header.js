import React, { useState, useContext } from "react";
import { Navbar, Container, Row, Col, Form, InputGroup, Dropdown } from "react-bootstrap";
import walletIcon from "./assets/images/icon/wallet.svg";
import userIcon from "./assets/images/icon/user.svg";
import "./assets/css/style.css";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "./contextApi/contextProvider";
import LoginModal from "./component/GoogleLogin";

function Header() {
  const navigate = useNavigate();
  const { searchProducts, userDetails, logout, setUserDetails } = useContext(WalletContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    if (!userDetails) {
      setShowLoginModal(true);
    } 
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    searchProducts(query); 
  };

  console.log("userDetails.................",userDetails)
  return (
    <header>
      <Navbar bg="white" expand="lg" className="shadow-sm p-2">
        <Container>
          <Row className="w-100 align-items-center">
            <Col md={2}>
              <Navbar.Brand href="/">
                <h1 className="mb-0">BRAND</h1>
              </Navbar.Brand>
            </Col>

            <Col md={{ span: 6, offset: 1 }}>
              <Form action="#">
                <InputGroup className="rounded-pill mt-2">
                  <Form.Control
                    type="search"
                    placeholder="Search for products..."
                    className="rounded-pill p-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </InputGroup>
              </Form>
            </Col>

            {/* <Col md={{ span: 2, offset: 1 }}>
              <div className="d-flex justify-content-end mt-2">
                <span className="mx-2">
                  <img
                    onClick={() => {
                      navigate("/wallet");
                    }}
                    width="30"
                    height="30"
                    src={walletIcon}
                    alt="Wallet"
                  />
                </span>
                <span className="mx-2">
                  <img width="30" height="30" src={userDetails ? userDetails?.picture : userIcon} onClick={()=>{
                    handleLoginClick()
                  }}/>
                </span>
              </div>
            </Col> */}
            <Col md={{ span: 2, offset: 1 }}>
              <div className="d-flex justify-content-end mt-2">
                {userDetails ? 
                <span className="mx-2">
                <img
                  onClick={() => {
                    navigate("/wallet");
                  }}
                  width="30"
                  height="30"
                  src={walletIcon}
                  alt="Wallet"
                />
              </span> : ""}

                <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
                  <Dropdown.Toggle as="span" className="mx-2" style={{ cursor: "pointer" }}>
                    <img
                      width="30"
                      height="30"
                      src={userDetails ? userDetails.picture : userIcon} 
                      alt="User"
                      className="rounded-circle"
                      onClick={handleLoginClick}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    {userDetails ? (
                      <>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item onClick={() => navigate("/login")}>Login</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
            <LoginModal  show={showLoginModal} handleClose={() => setShowLoginModal(false)} setUser={setUserDetails} />
          </Row>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
