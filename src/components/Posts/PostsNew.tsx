import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import './Posts.css';
import { Post } from '../../types/commonType';
import { useAuthContext } from '../../providers/AuthProvider/auth-context.ts';
import CommentField from '../CommentField/CommentField.tsx';

const PostsNew = () => {
  const { getUserById, currentUser } = useAuthContext();
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse] = await Promise.all([
          fetch('http://localhost:8000/posts'),
        ]);
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleCommentSubmit = (commentText) => {
    console.log('commentText: ', commentText);
  }
  return (
    <Box>
      {posts.map((post) => {
        const postUser = getUserById(post.userId)
        return (
          <Card key={post.id} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={postUser?.image} sx={{ mr: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {postUser?.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {post.title}
                </Typography>
              </Box>
            </CardContent>
            <CardContent>
              {post.comments.map((objComment) => {
                const commentUser = getUserById(objComment.userId)
                return (
                  <Box key={objComment.id} sx={{ ml: -2 }}>
                    <Box sx={{ mb: 2 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar src={commentUser?.image} />
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
                              {commentUser?.name}
                            </Typography>
                            <Typography variant="body2">
                              {objComment.text}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                color: '#616161',
                              }}
                            // onClick={() => setReplyField(comment.id)}
                            >
                              Reply
                            </Typography>
                          </Box>
                        </Card>
                      </Box>
                    </Box>
                  </Box>
                )
              })}

              <CommentField
                postId={post.id}
                selectedUser={currentUser}
                handleCommentSubmit={handleCommentSubmit}
              />
            </CardContent>
          </Card>
        )
      })}
    </Box>
  );
};

export default PostsNew;
