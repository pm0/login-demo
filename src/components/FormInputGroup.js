import React from "react";
import Form from "react-bootstrap/Form";

export default function FormInputGroup(props) {
  const {
    id,
    type,
    label,
    value,
    error,
    onChange,
    validationRegex,
    disabled,
    children
  } = props;
  const regexTest = validationRegex && validationRegex.test(value);

  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
        isValid={validationRegex && value && regexTest}
        isInvalid={(validationRegex && value && !regexTest) || error}
        disabled={disabled}
      />
      {children}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
