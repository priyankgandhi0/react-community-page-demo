import React, { useState } from 'react';
import { Box, Button, TextField, Avatar, Card } from '@mui/material';

const PostInput = ({ selectedUser, setPosts }) => {
  const [postText, setPostText] = useState('');

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    if (!postText.trim()) return;

    // Create a new post object
    const newPost = {
      postId: Date.now(),
      userId: selectedUser.userId,
      description: truncateText(postText, 500),
      comments: [],
    };

    // Update the posts state by adding the new post at the beginning
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    setPostText('');
  };

  return (
    <Box>
      <Card sx={{ mb: 2, p: 3 }}>
        <Box sx={{ display: 'flex' }}>
          <Avatar src={selectedUser.image} sx={{ mr: 2 }} />
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
