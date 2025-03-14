import axios from "axios";
import { getKey, getToken, getUserId, getUrl } from "./Common";

axios.defaults.withCredentials = true;
const api_url1 = getUrl();
//export const api_url = `${api_url1}/`; //"https://product.sukraa.in/sailtestingapi/api/";

//const api1 = "http://localhost:5000/sailtestingapi/api/";

export const api_url = "https://product.sukraa.in/portalnew/api"

export const api_img = "https://product.sukraa.in/portalnew/"


const ApiCall = (headerMC) => {
  // Header function
  const header = () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getToken()}`,
      SecretKey: getKey(),
      UserId: getUserId(),
      //"Accept-Language": "ta",
    };

    if (headerMC) {
      headers["Mode"] = headerMC.Mode;
      headers["COMMAND"] = headerMC.Command;
    }

    return { headers };
  };

  // Interceptor for handling errors
  axios.interceptors.response.use(
    (response) => response, // If the response is successful, just return it
    (error) => {
      if (error.response) {
        const { status } = error.response;

        if (status === 400) {
          console.error("Bad Request: ", error.response.data);
          // Handle 400-specific logic here
          return Promise.reject(
            new Error("Bad Request. Please check your input.")
          );
        }

        if (status === 401) {
          console.error("Unauthorized: ", error.response.data);
          // Handle 401-specific logic here, e.g., redirect to login or refresh token
          return Promise.reject(
            new Error("Unauthorized. Please log in again.")
          );
        }
      }

      return Promise.reject(error); // For other errors, reject the promise
    }
  );

  const get = async (subUrl) => {
    try {
      const response = await axios.get(`${api_url}${subUrl}`, header());
      return { response };
    } catch (error) {
      throw error; // Re-throw for handling in higher-level components
    }
  };

  const post = async (subUrl, body) => {
    try {
      const response = await axios.post(
        `${api_url}${subUrl}`,
        body,
        header()
      );
      return response.data;
    } catch (error) {
      throw error; // Re-throw for handling in higher-level components
    }
  };

  const post1 = async (subUrl, body) => {
    try {
      const response = await axios.post(
        `${api_url}${subUrl}`,
        body,
        header()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const postPq = async (subUrl, body) => {
    try {
      const response = await axios.post(
        `${api_url}${subUrl}`,
        body,
        header()
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const put = async (photo) => {
    try {
      const response = await axios.put(
        `${api_url}/${photo.id}`,
        photo,
        header()
      );
      return response.data;
    } catch (error) {
      throw error; // Re-throw for handling in higher-level components
    }
  };

  const sDelete = async (subUrl) => {
    try {
      const response = await axios.delete(`${api_url}${subUrl}`, header());
      return response.data;
    } catch (error) {
      throw error; // Re-throw for handling in higher-level components
    }
  };

  return { get, post, put, post1, sDelete, postPq };
};

export default ApiCall;
