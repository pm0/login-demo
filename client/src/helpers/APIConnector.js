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

export async function logout() {
  const response = await apiCall("/logout", "get");
  return response;
}

export async function fetchUsersList() {
  const response = await apiCall("/usersList", "get");
  return response;
}

async function apiCall(url, method, data) {
  try {
    const response = await axios.request({
      url,
      method,
      data,
      validateStatus: status => status >= 200 && status < 401
    });
    return response;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      // Session error
      window.location.href = "/login";
      return null;
    } else {
      return {
        data: {
          validationErrors: {
            form: "Sorry something went wrong, please try again"
          }
        }
      };
    }
  }
}
