import { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent } from '@mui/material';

const AddPage = () => {
  const [postId, setPostId] = useState('');
  const [username, setUsername] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the post data to your backend API
      const response = await fetch('http://localhost:8080/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          username,
          post,
        }),
      });

      if (response.ok) {
        // Handle success response
        console.log('Post added successfully');
      } else {
        // Handle error response
        console.log('Failed to add post');
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Add a New Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Post ID"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddPage;
