import { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import { createHash } from 'crypto';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = createHash('sha256').update(password).digest('hex');

      const data = {
        username,
        password: hashedPassword,
      };

      // Send the data to the backend API
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Login successful, redirect to the posts page
        window.location.href = '/posts';
      } else {
        // Invalid credentials, show an alert
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
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
                Log In
              </Button>
            </CardActions>
          </form>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <span>
                <Link href="/signup">Sign up</Link>
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
