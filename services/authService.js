// // services/authService.js
// import apiClient from './apiClient';

// export const signIn = async (credentials) => {
//   // POST to your secure API endpoint
//   const response = await apiClient.post('/login', credentials);
//   return response.data;
// };

// services/authService.js
export const signIn = async ({ email, password }) => {
    // Static credentials for testing purposes
    const staticEmail = 'test@example.com';
    const staticPassword = 'password123';
  
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        if (email === staticEmail && password === staticPassword) {
          // Simulate a successful response with token and user data
          resolve({
            token: 'dummy-token-1234567890',
            user: {
              name: 'Test User',
              email: staticEmail,
            },
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  