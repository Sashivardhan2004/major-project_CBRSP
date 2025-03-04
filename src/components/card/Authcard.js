import { Navigate } from 'react-router-dom';

export const handleSubmit = async (
  e,
  isLogin,
  name,
  email,
  password,
  confirmPassword,
  setError,
  setLoading
) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!email.includes('@')) {
    setError('Please enter a valid email.');
    setLoading(false);
    return;
  }
  if (password.length < 6) {
    setError('Password must be at least 6 characters long.');
    setLoading(false);
    return;
  }
  if (!isLogin && name.trim() === '') {
    setError('Name cannot be empty.');
    setLoading(false);
    return;
  }
  if (!isLogin && password !== confirmPassword) {
    setError('Passwords do not match.');
    setLoading(false);
    return;
  }

  try {
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/signup';
    const data = isLogin ? { email, password } : { name, email, password };
    const response = await axios.post(url, data);

    if (response.data.token) {
      localStorage.setItem('Rstoken', response.data.token); // Store token for authentication
    }

    alert(isLogin ? 'Login successful!' : 'Signup successful!');
    // Redirect to login after
    Navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.error || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};
