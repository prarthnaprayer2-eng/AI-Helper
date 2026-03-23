// Hardcoded credentials
const VALID_USERS = [
  { email: 'student@example.com', password: 'password123' },
  { email: 'aryan@college.com', password: 'aryan123' },
  { email: 'demo@test.com', password: 'demo123' }
];

// Check if user is authenticated
export function isAuthenticated() {
  const auth = localStorage.getItem('auth');
  return auth && JSON.parse(auth).isLoggedIn === true;
}

// Get current user
export function getCurrentUser() {
  const auth = localStorage.getItem('auth');
  if (auth) {
    const parsed = JSON.parse(auth);
    if (parsed.isLoggedIn) {
      return parsed.user;
    }
  }
  return null;
}

// Login user
export function loginUser(email, password) {
  const user = VALID_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    const userData = {
      isLoggedIn: true,
      user: {
        email: user.email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        loginTime: new Date().toISOString()
      }
    };
    localStorage.setItem('auth', JSON.stringify(userData));
    return { success: true, user: userData.user };
  }
  
  return { success: false, error: 'Invalid email or password' };
}

// Logout user
export function logoutUser() {
  localStorage.removeItem('auth');
  return true;
}
