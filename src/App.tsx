import React, { useState, useEffect } from 'react';
import './App.css';
import { Box, Container } from '@mui/material';
import PostInput from './components/PostInput/PostInput.tsx';
import UserProfiles from './components/UserProfiles/UserProfiles.tsx';
import repliesData from './data/replies.json';
import PostsNew from './components/Posts/PostsNew.tsx';
import { AuthProvider } from './providers/AuthProvider/auth-provider.tsx';

function App() {
  const [replies, setReplies] = useState(() => {
    const savedreplies = localStorage.getItem('replies');
    return savedreplies ? JSON.parse(savedreplies) : repliesData;
  });

  useEffect(() => {
    localStorage.setItem('replies', JSON.stringify(replies));
  }, [replies]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f0f0f0',
      }}
    >
      <AuthProvider>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              minHeight: '100vh',
              bgcolor: '#f0f0f0',
            }}
          >
            <Box
              sx={{
                flex: 5,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <PostInput />
              <PostsNew />
            </Box>
            <Box sx={{ flex: 2, p: 2 }}>
              <UserProfiles />
            </Box>
          </Box>
        </Container>
      </AuthProvider>
    </Box>
  );
}

export default App;
