import React, { useState, useEffect } from 'react';
import './App.css';
import { Box } from '@mui/material';
import PostInput from './components/PostInput/PostInput.tsx';
import UserProfiles from './components/UserProfiles/UserProfiles.tsx';
import Posts from './components/Posts/Posts.tsx';
import usersData from './data/users.json';
import postsData from './data/postsData.json';
import repliesData from './data/replies.json';

function App() {
  const [users] = useState(usersData.users);
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : postsData.posts;
  });
  const [replies, setReplies] = useState(() => {
    const savedreplies = localStorage.getItem('replies');
    return savedreplies ? JSON.parse(savedreplies) : repliesData;
  });
  const [selectedUser, setSelectedUser] = useState<Object>(users[0]);

  // Save posts to localStorage whenever posts state changes
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

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
      <Box
        sx={{
          display: 'flex',
          width: '60%',
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
          <PostInput selectedUser={selectedUser} setPosts={setPosts} />
          <Posts
            selectedUser={selectedUser}
            posts={posts}
            setPosts={setPosts}
            replies={replies}
            setReplies={setReplies}
          />
        </Box>
        <Box sx={{ flex: 2, p: 2 }}>
          <UserProfiles
            selectedUser={selectedUser}
            changeUser={setSelectedUser}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
