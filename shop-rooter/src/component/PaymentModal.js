import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

function PaymentModal({ show, handleClose, requiredFields, onPaymentSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFields = Object.keys(requiredFields[0]).filter(
    (key) => requiredFields[0][key] === true
  );

  const validationSchema = Yup.object(
    filteredFields.reduce((schema, field) => {
      schema[field] = Yup.string().required(`${field.toUpperCase().charAt(0) + field.slice(1)} is required`);
      return schema;
    }, {})
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={filteredFields.reduce((values, field) => {
            values[field] = "";
            return values;
          }, {})}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (isSubmitting) return;

            setIsSubmitting(true);
            console.log("Form Submitted:", values);
            onPaymentSuccess(values);
            setSubmitting(false);
            setIsSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              {filteredFields.map((field) => (
                <div key={field} className="mb-3">
                  <label className="form-label">{field.toUpperCase().charAt(0) + field.slice(1)}</label>
                  <Field name={field} type="text" className="form-control" />
                  <ErrorMessage name={field} component="div" className="text-danger" />
                </div>
              ))}
              <Modal.Footer>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModal;
