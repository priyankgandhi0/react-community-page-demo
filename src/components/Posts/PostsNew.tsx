import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import "./Posts.css";
import { useAuthContext } from "../../providers/AuthProvider/auth-context.ts";
import CommentField from "../CommentField/CommentField.tsx";
import { usePostContext } from "../../providers/PostsProvider/posts-context.ts";
import ReplyField from "../ReplyField/ReplyField.tsx";

const PostsNew = () => {
  const { getUserById } = useAuthContext();
  const { posts, selectedCommentId, setSelectedCommentId } = usePostContext();
  console.log("selectedCommentId => ", selectedCommentId);

  return (
    <Box>
      {posts?.map((post) => {
        const postUser = getUserById(post.userId);
        return (
          <Card key={post.id} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={postUser?.image} sx={{ mr: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
                const commentUser = getUserById(objComment.userId);
                return (
                  <>
                    <Box key={objComment.id} sx={{ ml: -2 }}>
                      <Box sx={{ mb: 2, px: 2 }}>
                        <Box display="flex" alignItems="start" gap={1}>
                          <Avatar src={commentUser?.image} />
                          <Card
                            sx={{
                              p: 1,
                              border: "1px solid #ede9e9",
                              width: "100%",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                sx={{
                                  fontWeight: "bold",
                                  paddingBottom: "10px",
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
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  color: "#616161",
                                }}
                                onClick={() =>
                                  selectedCommentId
                                    ? setSelectedCommentId(undefined)
                                    : setSelectedCommentId(objComment?.id)
                                }
                              >
                                {selectedCommentId &&
                                selectedCommentId === objComment.id
                                  ? "Cancel"
                                  : "Reply"}
                              </Typography>

                              {selectedCommentId &&
                                selectedCommentId === objComment.id && (
                                  <ReplyField post={post} />
                                )}
                            </Box>
                          </Card>
                        </Box>
                      </Box>
                    </Box>
                    {objComment.replies.map((reply) => {
                      const replyUser = getUserById(reply.userId);
                      return (
                        <Box key={reply.id} sx={{ ml: -2 }}>
                          <Box sx={{ mb: 2, pl: 6, pr: 2 }}>
                            <Box display="flex" alignItems="start" gap={1}>
                              <Avatar src={replyUser?.image} />
                              <Card
                                sx={{
                                  p: 1,
                                  border: "1px solid #ede9e9",
                                  width: "100%",
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="textPrimary"
                                    sx={{
                                      fontWeight: "bold",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    {replyUser?.name}
                                  </Typography>
                                  <Typography variant="body2">
                                    {reply.text}
                                  </Typography>
                                </Box>
                              </Card>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </>
                );
              })}

              <CommentField post={post} />
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default PostsNew;
