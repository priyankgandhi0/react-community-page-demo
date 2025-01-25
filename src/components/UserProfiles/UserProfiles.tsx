import React from 'react';
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
import { useAuthContext } from '../../providers/AuthProvider/auth-context.ts';
import { User } from '../../types/commonType';

const UserProfiles = () => {
  const { currentUser, setCurrentUser, users } = useAuthContext();
  const userId = currentUser?.id;
  const handleUserClick = (user: User) => {
    setCurrentUser(user)
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
            key={user.id}
            onClick={() => handleUserClick(user)}
            sx={{
              cursor: 'pointer',
              borderRadius: '10px',
              bgcolor:
                userId === user.id ? 'primary.light' : 'background.paper',
              color: userId === user.id ? 'white' : 'black',
              transition: 'background-color 0.3s',
              mb: 1,
              '&:hover': {
                bgcolor: userId === user.id ? 'primary.light' : '#f5f5f5',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar src={user.image} alt={user.name} sx={{ mr: 2 }} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              sx={{
                fontWeight: userId === user.id ? 'bold' : 'normal',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default UserProfiles;