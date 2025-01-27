import { createContext, useContext } from "react";
import { Post } from "../../types/commonType";

interface PostsContextType {
  posts: Post[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
  loadingSave: boolean;
  setLoadingSave: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCommentId: number | undefined;
  setSelectedCommentId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const PostContext = createContext<PostsContextType | undefined>(
  undefined
);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("useAuth must be used within an PostProvider");
  }
  return context;
};
