import React, { useState } from 'react';
import { Box, Button, TextField, Avatar, Card } from '@mui/material';
import { useAuthContext } from '../../providers/AuthProvider/auth-context.ts';
import axios from 'axios';

const PostInput = () => {
  const { currentUser } = useAuthContext();
  const [postText, setPostText] = useState('');

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };


  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!postText.trim()) return;

    // Create a new post object
    const newPost = {
      title: truncateText(postText, 500),
      comments: [],
      userId: currentUser?.id || 0, // Use fallback ID if no user is logged in
    };

    try {
      // Send a POST request to the JSON Server
      const response = await axios.post('http://localhost:8000/posts', newPost);

      // Update local state with the new post
      // setPosts((prevPosts) => [...prevPosts, response.data]);

      // Clear the input field
      setPostText('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 2, p: 3 }}>
        <Box sx={{ display: 'flex' }}>
          <Avatar src={currentUser?.image} sx={{ mr: 2 }} />
          <Box sx={{ width: '100%', height: '100%' }}>
            <form onSubmit={handlePostSubmit}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="What's on your mind?"
                sx={{ mb: 2, border: '1px solid #eeeeee' }}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginRight: '5px',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: '10px' }}
                >
                  Post
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default PostInput;
