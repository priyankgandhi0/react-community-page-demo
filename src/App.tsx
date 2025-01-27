import React from "react";
import "./App.css";
import { Box, Container } from "@mui/material";
import PostInput from "./components/PostInput/PostInput.tsx";
import UserProfiles from "./components/UserProfiles/UserProfiles.tsx";
import PostsNew from "./components/Posts/PostsNew.tsx";
import { AuthProvider } from "./providers/AuthProvider/auth-provider.tsx";
import { PostsProvider } from "./providers/PostsProvider/posts-provider.tsx";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f0f0f0",
      }}
    >
      <AuthProvider>
        <PostsProvider>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "#f0f0f0",
              }}
            >
              <Box
                sx={{
                  flex: 5,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
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
        </PostsProvider>
      </AuthProvider>
    </Box>
  );
}

export default App;
