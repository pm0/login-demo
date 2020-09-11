import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PageTemplate from "./PageTemplate";
import FormInputGroup from "../components/FormInputGroup";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX
} from "../helpers/RegexConstants";

const initialFormValues = {
  name: "",
  email: "",
  password: ""
};

function RegistrationPage() {
  const [form, setForm] = useState({ ...initialFormValues });
  const [formErrors, setFormErrors] = useState({ ...initialFormValues });
  const [submitting, setSubmitting] = useState(false);
  const [submitCompleted, setSubmitCompleted] = useState(false);

  function onFormChange(field, value) {
    setForm({
      ...form,
      [field]: value
    });
    setFormErrors({
      ...formErrors,
      [field]: ""
    });
  }

  function onFormSubmit() {
    let nameError = "",
      emailError = "",
      passwordError = "";
    if (!NAME_REGEX.test(form.name)) {
      nameError = "Please enter your name";
    }
    if (!EMAIL_REGEX.test(form.email)) {
      emailError = "Please enter a valid email address";
    }
    if (!PASSWORD_REGEX.test(form.password)) {
      passwordError = "Please enter a valid password";
    }

    if (!nameError && !emailError && !passwordError) {
      setSubmitting(true);
      setSubmitCompleted(false);

      setTimeout(() => {
        setSubmitting(false);
        setForm({ ...initialFormValues });
        setFormErrors({ ...initialFormValues });
        setSubmitCompleted(true);
      }, 1000);
    }

    setFormErrors({
      name: nameError,
      email: emailError,
      password: passwordError
    });
  }

  return (
    <PageTemplate title="Register" heading="Demo Registration">
      <Form>
        <FormInputGroup
          id="registration-form-name"
          type="text"
          label="Name"
          value={form.name}
          error={formErrors.name}
          onChange={e => onFormChange("name", e.target.value)}
          onEnterHandler={onFormSubmit}
          validationRegex={NAME_REGEX}
          disabled={submitting}
        />

        <FormInputGroup
          id="registration-form-email"
          type="text"
          label="Email Address"
          value={form.email}
          error={formErrors.email}
          onChange={e => onFormChange("email", e.target.value)}
          onEnterHandler={onFormSubmit}
          validationRegex={EMAIL_REGEX}
          disabled={submitting}
        />

        <FormInputGroup
          id="registration-form-password"
          type="password"
          label="Password"
          value={form.password}
          error={formErrors.password}
          onChange={e => onFormChange("password", e.target.value)}
          onEnterHandler={onFormSubmit}
          validationRegex={PASSWORD_REGEX}
          disabled={submitting}
        >
          <Form.Text muted>
            Must be 12+ characters long, have one or more uppercase letters and
            one or more symbols
          </Form.Text>
        </FormInputGroup>
      </Form>

      <div className="button-spinner-wrapper">
        <Button variant="primary" onClick={onFormSubmit} disabled={submitting}>
          Register
        </Button>

        {submitting && <Spinner animation="border" variant="primary" />}
      </div>

      {!submitting && !submitCompleted && (
        <div className="page-footer-text">
          <span>Existing user?&nbsp;</span>
          <Link to="/login">
            <b>Log in here</b>
          </Link>
        </div>
      )}

      {submitCompleted && (
        <div className="page-footer-text">
          <span>Thanks for registering. Please&nbsp;</span>
          <Link to="/login">
            <b>log in here</b>
          </Link>
        </div>
      )}
    </PageTemplate>
  );
}

export default RegistrationPage;
