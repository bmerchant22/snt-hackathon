import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/fetch-posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Lost and Found Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post.PostId} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {post.Post}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created By: {post.Username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created At: {post.CreatedAt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsPage;

