import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormInputGroup from "../components/FormInputGroup";
import "./RegistrationPage.scss";

const initialFormValues = {
  name: "",
  email: "",
  password: ""
};

function RegistrationPage() {
  const [form, setForm] = useState({ ...initialFormValues });

  function onFormChange(field, value) {
    setForm({ ...form, [field]: value });
  }

  return (
    <div className="registration-page">
      <Container>
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            <h1 className="registration-header">Registration Demo</h1>
            <Card className="registration-card">
              <Card.Body>
                <Form>
                  <FormInputGroup
                    id="registration-form-name"
                    type="text"
                    label="Name"
                    value={form.name}
                    onChange={e => onFormChange("name", e.target.value)}
                  />

                  <FormInputGroup
                    id="registration-form-email"
                    type="email"
                    label="Email Address"
                    value={form.email}
                    onChange={e => onFormChange("email", e.target.value)}
                  />

                  <FormInputGroup
                    id="registration-form-password"
                    type="text"
                    label="Password"
                    value={form.password}
                    onChange={e => onFormChange("password", e.target.value)}
                  />
                </Form>

                <Button variant="primary">Register</Button>

                <div className="registration-existing-user">
                  Existing user? Log in{" "}
                  <Link to="/login">
                    <b>here</b>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegistrationPage;
