import React, { useState } from "react";
import { Box, Button, TextField, Avatar } from "@mui/material";
import { useAuthContext } from "../../providers/AuthProvider/auth-context.ts";
import axios from "axios";
import { usePostContext } from "../../providers/PostsProvider/posts-context.ts";
import { Comment } from "../../types/commonType.ts";

const CommentField = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const { currentUser } = useAuthContext();
  const { setLoadingSave } = usePostContext();

  const handleSubmit = async () => {
    setLoadingSave(true);
    const newComment: Comment = {
      id: Date.now(),
      userId: currentUser?.id || 0, // Use fallback ID if no user is logged in
      text: commentText,
      replies: [],
      createdAt: new Date(),
    };
    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment],
      userId: currentUser?.id || 0, // Use fallback ID if no user is logged in
      createdAt: new Date(),
    };

    try {
      // Send a POST request to the JSON Server
      await axios.put(`http://localhost:8000/posts/${post.id}`, updatedPost);

      // Clear the input field
      setCommentText("");
      setLoadingSave(false);
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
        Comment
      </Button>
    </Box>
  );
};

export default CommentField;
