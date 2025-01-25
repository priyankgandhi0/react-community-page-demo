export interface Comment {
  id: number;
  userId: number;
  text: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  comments: Comment[];
}

export interface User {
  id: number;
  name: string;
  image: string;
}
