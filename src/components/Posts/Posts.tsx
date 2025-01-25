import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import './Posts.css';
import usersData from '../../data/users.json';
import CommentField from '../CommentField/CommentField.tsx';

const Posts = ({ selectedUser, posts, setPosts, replies, setReplies }) => {
  const [replyField, setReplyField] = useState(null);
  const [replyText, setReplyText] = useState('');
  const replyFieldRef = useRef<HTMLDivElement | null>(null);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  function fetchUser(userId) {
    return usersData.users.find((user) => user.userId === userId);
  }

  const handleCommentSubmit = (postId, commentText) => {
    if (!commentText.trim()) return;

    // Add the new comment to the post
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.postId === postId) {
          const newComment = {
            id: Date.now(),
            userId: selectedUser.userId,
            commentText: truncateText(commentText, 200),
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  const handleReplySubmit = (commentId, replyText) => {
    if (!replyText.trim()) return;

    setReplies((prevReplies) => {
      const updatedReplies = {
        ...prevReplies,
        [commentId]: [
          ...(prevReplies[commentId] || []),
          {
            id: Date.now(),
            userId: selectedUser.userId,
            commentText: truncateText(replyText, 200),
          },
        ],
      };

      return updatedReplies;
    });

    setReplyText('');
    setReplyField(null);
  };

  // Close the reply field when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        replyFieldRef.current &&
        !replyFieldRef.current.contains(event.target)
      ) {
        setReplyField(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch('http://localhost:8000/posts'),
          fetch('http://localhost:8000/users'),
        ]);
        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();
        setPosts(postsData);
        console.log('usersData: ', usersData);
        // setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('posts: ', posts);
  return (
    <Box>
      {posts.map((post) => {
        const user = fetchUser(post.userId);
        if (!user) return null;
        return (
          <Card key={post.postId} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={user.image} sx={{ mr: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {user.name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {post.title}
                </Typography>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ pl: 2 }}>
                {post.comments?.map((comment) => {
                  const user = fetchUser(comment.userId);
                  if (!user) return null;
                  return (
                    <Box key={comment.id} sx={{ ml: -2 }}>
                      <Box sx={{ mb: 2 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar src={user.image} />
                          <Card
                            sx={{
                              p: 1,
                              border: '1px solid #ede9e9',
                              width: '100%',
                            }}
                          >
                            <Box>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                sx={{
                                  fontWeight: 'bold',
                                  paddingBottom: '10px',
                                }}
                              >
                                {user.name}
                              </Typography>
                              <Typography variant="body2">
                                {comment.commentText}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  mt: 1,
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  color: '#616161',
                                }}
                                onClick={() => setReplyField(comment.id)}
                              >
                                Reply
                              </Typography>
                            </Box>
                          </Card>
                        </Box>
                      </Box>
                      {replies[comment.id] &&
                        replies[comment.id].map((nestedComment) => {
                          const user = fetchUser(nestedComment.userId);
                          if (!user) return null;
                          return (
                            <Box key={nestedComment.id} sx={{ mb: 2, pl: 5 }}>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Avatar src={user.image} />
                                <Card
                                  sx={{
                                    p: 1,
                                    border: '1px solid #ede9e9',
                                    width: '100%',
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      color="textPrimary"
                                      sx={{
                                        fontWeight: 'bold',
                                        paddingBottom: '10px',
                                      }}
                                    >
                                      {user.name}
                                    </Typography>
                                    <Typography variant="body2">
                                      {nestedComment.commentText}
                                    </Typography>
                                  </Box>
                                </Card>
                              </Box>
                            </Box>
                          );
                        })}
                      {replyField === comment.id && (
                        <Box ref={replyFieldRef} sx={{ mt: 2, mb: 2, pl: 5 }}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar src={selectedUser.image} />
                            <TextField
                              placeholder="Write a reply..."
                              size="small"
                              sx={{ flex: 1 }}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleReplySubmit(comment.id, replyText);
                                  e.preventDefault();
                                }
                              }}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ borderRadius: '10px' }}
                              onClick={() =>
                                handleReplySubmit(comment.id, replyText)
                              }
                            >
                              Reply
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>

              <CommentField
                postId={post.postId}
                selectedUser={selectedUser}
                handleCommentSubmit={handleCommentSubmit}
              />
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Posts;
