import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { auth, provider, signInWithPopup } from "../firebaseConfiguration"; 
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginModal = ({ show, handleClose, setUser }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await fetch("http://localhost:5000/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await response.json();
      console.log("Login Successful:", data);
      localStorage.setItem("user", JSON.stringify(data.user)); 
      setUser(data.user);
      handleClose();
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const sendOtp = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phoneNumber}`,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (error) {
      console.error("OTP Send Error:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      console.log("Phone Login Successful");
      handleClose();
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Signup to Continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!otpSent ? (
          <>
            <Formik
              initialValues={{ phoneNumber: "" }}
              validationSchema={Yup.object({
                phoneNumber: Yup.string()
                  .matches(/^\d{10}$/, "Enter a valid 10-digit number")
                  .required("Phone number is required"),
              })}
              onSubmit={(values) => {
                setPhoneNumber(values.phoneNumber);
                sendOtp();
              }}
            >
              {({ isSubmitting }) => (
                <FormikForm>
                  <Form.Group>
                    <div className="d-flex align-items-center">
                      <span className="me-2">🇮🇳 +91</span>
                      <Field
                        name="phoneNumber"
                        type="text"
                        className="form-control"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-3 w-100" disabled={isSubmitting}>
                    Continue
                  </Button>
                </FormikForm>
              )}
            </Formik>
          </>
        ) : (
          <>
            <Form.Group>
              <Field
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-3 w-100" onClick={verifyOtp}>
              Verify OTP
            </Button>
          </>
        )}
        <div className="text-center my-3">OR</div>
        <Button className="w-100 d-flex align-items-center justify-content-center" onClick={handleGoogleLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            width={20}
            height={20}
            className="me-2"
          />
          Sign in with Google
        </Button>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <small>
          <a href="#">Terms & Conditions</a> | <a href="#">Privacy Policy</a>
        </small>
      </Modal.Footer>
      <div id="recaptcha-container"></div>
    </Modal>
  );
};

export default LoginModal;
