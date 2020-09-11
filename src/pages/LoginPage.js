import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PageTemplate from "./PageTemplate";
import FormInputGroup from "../components/FormInputGroup";

const initialFormValues = {
  email: "",
  password: ""
};

function LoginPage() {
  const [form, setForm] = useState({ ...initialFormValues });
  const [formErrors, setFormErrors] = useState({ ...initialFormValues });
  const [submitting, setSubmitting] = useState(false);
  let history = useHistory();

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
    let emailError = "",
      passwordError = "";

    if (!form.email) {
      emailError = "Please enter your email address";
    }
    if (!form.password) {
      passwordError = "Please enter your password";
    }

    if (!emailError && !passwordError) {
      setSubmitting(true);

      setTimeout(() => {
        setSubmitting(false);
        setForm({ ...initialFormValues });
        setFormErrors({ ...initialFormValues });
        history.push("/users");
      }, 1000);
    }

    setFormErrors({
      email: emailError,
      password: passwordError
    });
  }

  return (
    <PageTemplate title="Login" heading="Demo Login">
      <Form>
        <FormInputGroup
          id="login-form-email"
          type="text"
          label="Email Address"
          value={form.email}
          error={formErrors.email}
          onChange={e => onFormChange("email", e.target.value)}
          onFormSubmit={onFormSubmit}
          disabled={submitting}
        />

        <FormInputGroup
          id="login-form-password"
          type="password"
          label="Password"
          value={form.password}
          error={formErrors.password}
          onChange={e => onFormChange("password", e.target.value)}
          onFormSubmit={onFormSubmit}
          disabled={submitting}
        />
      </Form>

      <div className="button-spinner-wrapper">
        <Button variant="primary" onClick={onFormSubmit} disabled={submitting}>
          Log in
        </Button>

        {submitting && <Spinner animation="border" variant="primary" />}
      </div>

      {!submitting && (
        <div className="page-footer-text">
          <span>New user?&nbsp;</span>
          <Link to="/">
            <b>Register here</b>
          </Link>
        </div>
      )}
    </PageTemplate>
  );
}

export default LoginPage;
