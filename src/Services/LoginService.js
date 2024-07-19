import axios from "axios";

const authapi = "https://dummyjson.com/auth/login";

export const loginService = async (id, password) => {
  try {
    const response = await axios.post(
      `${authapi}`,
      {
        username: id,
        password: password,
        expiresInMins: 30,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(response);
    if (response.status !== 200) {
      throw new Error(`Failed to login: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("username");
  window.location.href = "/login";
};
