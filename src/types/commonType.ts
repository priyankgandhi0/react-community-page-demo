export interface Comment {
  id: number;
  userId: number;
  text: string;
  replies: Comment[];
  createdAt: Date;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  comments: Comment[];
  createdAt: Date;
}

export interface User {
  id: number;
  name: string;
  image: string;
}
