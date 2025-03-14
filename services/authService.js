import axios from 'axios';

const API_URL = "https://product.sukraa.in/portalnew/api";

export const signIn = async (credentials) => {
  // POST to your secure API endpoint
  const response = await axios.post(`${API_URL}/Auth`, credentials);
  return response.data;
};


  