import axios from "axios";

export async function submitRegistrationForm(form) {
  const response = await apiCall("/register", "post", {
    name: form.name,
    email: form.email,
    password: form.password
  });
  return response;
}

export async function submitLogin(form) {
  const response = await apiCall("/login", "post", {
    email: form.email,
    password: form.password
  });
  return response;
}

async function apiCall(url, method, data) {
  try {
    const response = await axios.request({
      url,
      method,
      data,
      validateStatus: status => status >= 200 && status < 500
    });
    return response;
  } catch (error) {
    console.error(error);
    return {
      data: {
        validationErrors: {
          form: "Sorry something went wrong, please try again"
        }
      }
    };
  }
}
