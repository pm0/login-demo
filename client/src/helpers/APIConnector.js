import axios from "axios";

export async function submitRegistrationForm(form) {
  try {
    const response = await axios.post(
      "/register",
      {
        name: form.name,
        email: form.email,
        password: form.password
      },
      {
        validateStatus: status => status >= 200 && status < 500
      }
    );
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
