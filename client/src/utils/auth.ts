// What exactly is JwtPayload doing here?
// What does the function do? Why might I need it?
import { JwtPayload, jwtDecode } from 'jwt-decode';

// In order to even get working on these methods, we should identify where they get used in the code first...

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode(localStorage.getItem('token'));
  }

  loggedIn() {
    // Return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // Return a value that indicates if the token is expired
    const decoded = jwtDecode(token);
    const expTime = decoded.exp as number;
    const currentTime = Math.floor(Date.now()/1000);

    return expTime < currentTime;

  }

  getToken(): string {
    // Return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // Set the token to localStorage
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Remove the token from localStorage
    // Redirect to the login page
    localStorage.setItem('token', '');
    window.location.assign('/login');
  }
}

export default new AuthService();
