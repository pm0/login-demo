import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import FormPageTemplate from "../pageTemplates/FormPageTemplate";
import FormInputGroup from "../components/FormInputGroup";
import { submitLogin } from "../helpers/APIConnector";

const initialFormValues = {
  email: "",
  password: ""
};
const initialFormErrors = {
  email: "",
  password: "",
  form: ""
};

function LoginPage() {
  const [form, setForm] = useState({ ...initialFormValues });
  const [formErrors, setFormErrors] = useState({ ...initialFormErrors });
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

  async function onFormSubmit() {
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
      setFormErrors({ ...initialFormErrors });

      const response = await submitLogin(form);

      setSubmitting(false);

      if (response.status === 200) {
        setForm({ ...initialFormValues });
        history.push("/users");
      } else if (response.data.validationErrors) {
        setFormErrors({
          ...initialFormErrors,
          ...response.data.validationErrors
        });
      }
    }

    setFormErrors({
      email: emailError,
      password: passwordError
    });
  }

  return (
    <FormPageTemplate
      title="Login"
      heading="Demo Login"
      inputs={
        <>
          <FormInputGroup
            id="login-form-email"
            type="text"
            label="Email Address"
            value={form.email}
            error={formErrors.email}
            onChange={e => onFormChange("email", e.target.value)}
            onEnterHandler={onFormSubmit}
            disabled={submitting}
          />
          <FormInputGroup
            id="login-form-password"
            type="password"
            label="Password"
            value={form.password}
            error={formErrors.password}
            onChange={e => onFormChange("password", e.target.value)}
            onEnterHandler={onFormSubmit}
            disabled={submitting}
          />
        </>
      }
      submitButton={
        <Button variant="primary" onClick={onFormSubmit} disabled={submitting}>
          Log in
        </Button>
      }
      submitting={submitting}
      generalFormError={formErrors.form}
    >
      {!submitting && (
        <div className="page-footer-text">
          <span>New user?&nbsp;</span>
          <Link to="/">
            <b>Register here</b>
          </Link>
        </div>
      )}
    </FormPageTemplate>
  );
}

export default LoginPage;
