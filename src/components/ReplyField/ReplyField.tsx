import React, { useState } from "react";
import { Box, Button, TextField, Avatar } from "@mui/material";
import { useAuthContext } from "../../providers/AuthProvider/auth-context.ts";
import { usePostContext } from "../../providers/PostsProvider/posts-context.ts";
import { Comment } from "../../types/commonType.ts";
import axios from "axios";

const ReplyField = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const { currentUser } = useAuthContext();
  const { setLoadingSave, selectedCommentId, setSelectedCommentId } =
    usePostContext();

  const handleSubmit = async () => {
    setLoadingSave(true);
    const updatedComments: Comment[] = post.comments.map((o) => {
      if (o.id === selectedCommentId)
        return {
          ...o,
          replies: [
            ...o.replies,
            {
              id: Date.now(),
              userId: currentUser?.id || 0,
              text: commentText,
              createdAt: new Date(),
            },
          ],
        };
      return o;
    });
    const updatedPost = {
      ...post,
      comments: [...updatedComments],
      userId: currentUser?.id || 0, // Use fallback ID if no user is logged in
      createdAt: new Date(),
    };

    try {
      // Send a POST request to the JSON Server
      await axios.put(`http://localhost:8000/posts/${post.id}`, updatedPost);

      // Clear the input field
      setCommentText("");
      setLoadingSave(false);
      setSelectedCommentId(undefined);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
      <Avatar src={currentUser?.image} />
      <TextField
        placeholder="Add a comment..."
        size="small"
        sx={{ flex: 1 }}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
            e.preventDefault();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: "10px" }}
        onClick={handleSubmit}
      >
        Reply
      </Button>
    </Box>
  );
};

export default ReplyField;
