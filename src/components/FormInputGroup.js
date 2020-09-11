import React from "react";
import Form from "react-bootstrap/Form";

export default function FormInputGroup(props) {
  const { id, type, label, value, onChange } = props;

  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} value={value} onChange={onChange} />
    </Form.Group>
  );
}
