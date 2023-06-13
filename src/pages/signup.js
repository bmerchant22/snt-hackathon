import { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import { createHash } from 'crypto';
import Link from 'next/link';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = createHash('sha256').update(password).digest('hex');

      const data = {
        username,
        email,
        password: hashedPassword,
      };

      // Send the data to the backend API
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Signup successful, redirect to the login page
        window.location.href = '/login';
      } else {
        // Handle signup error, show an alert
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
            </CardActions>
          </form>
          <Typography>
                  Already have an account?{' '}
                  <span>
                    <Link href="/login">Login</Link>
                  </span>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignupPage;
