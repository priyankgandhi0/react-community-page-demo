import React, { useState } from 'react';
import { Box, Button, TextField, Avatar } from '@mui/material';

const CommentField = ({ postId, selectedUser, handleCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    handleCommentSubmit(postId, commentText);
    setCommentText('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
      <Avatar src={selectedUser.image} />
      <TextField
        placeholder="Add a comment..."
        size="small"
        sx={{ flex: 1 }}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
            e.preventDefault();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: '10px' }}
        onClick={handleSubmit}
      >
        Comment
      </Button>
    </Box>
  );
};

export default CommentField;
