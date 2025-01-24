import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
} from '@mui/material';
import usersData from '../../data/users.json';

const UserProfiles = ({selectedUser, changeUser}) => {
  const [users] = useState(usersData.users);
  const userId = selectedUser.userId;
  const handleUserClick = (user: object) => {
    changeUser(user);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <Box
        sx={{
          width: '55px',
          height: '2px',
          bgcolor: 'primary.light',
          borderRadius: '5px',
          mt: -1,
        }}
      />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users.map((user) => (
          <ListItem
            key={user.userId}
            onClick={() => handleUserClick(user)}
            sx={{
              cursor: 'pointer',
              borderRadius: '10px',
              bgcolor:
              userId === user.userId ? 'primary.light' : 'background.paper',
              color:  userId === user.userId ? 'white' : 'black',
              transition: 'background-color 0.3s',
              mb: 1,
              '&:hover': {
                bgcolor: userId === user.userId ? 'primary.light' : '#f5f5f5',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar src={user.image} alt={user.name} sx={{ mr: 2 }} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              sx={{
                fontWeight: userId === user.userId ? 'bold' : 'normal',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default UserProfiles;