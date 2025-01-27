import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Post } from "../../types/commonType";
import { PostContext } from "./posts-context.ts";
interface PostsProviderProps {
  children: ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState<
    number | undefined
  >();

  const fetchData = async () => {
    try {
      const [postsResponse] = await Promise.all([
        fetch("http://localhost:8000/posts?_sort=-createdAt"),
      ]);
      const postsData = await postsResponse.json();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (!loadingSave) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingSave]);

  const value = useMemo(
    () => ({
      posts,
      setPosts,
      loadingSave,
      setLoadingSave,
      selectedCommentId,
      setSelectedCommentId,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts, selectedCommentId]
  );
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
