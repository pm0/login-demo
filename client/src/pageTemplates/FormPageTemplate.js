import React from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import PageTemplate from "./PageTemplate";

function FormPageTemplate(props) {
  const {
    title,
    heading,
    inputs,
    submitButton,
    submitting,
    generalFormError,
    children
  } = props;

  return (
    <PageTemplate title={title} heading={heading}>
      <Form>{inputs}</Form>

      <div className="button-spinner-wrapper">
        {submitButton}
        {submitting && <Spinner animation="border" variant="primary" />}
      </div>

      <div>
        <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
          {generalFormError}
        </Form.Control.Feedback>
      </div>

      {children}
    </PageTemplate>
  );
}

export default FormPageTemplate;
