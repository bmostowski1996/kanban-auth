import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST', // Specify POST method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo) // Include request payload
    });
    

    if (!response.ok) {
      // For handling 401 responses
      throw new Error(`${response.statusText}`);
    }

    const data = await response.json();
    return data;
    
  } catch (err) {
    console.error('Error: ', err);
  }
  
}



export { login };
