const userApi = {
  login: async (email, password) => {
      const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json(); 
  },
};

export default userApi; 
