export interface Post {
  id: number;
  title: string;
  content: string;
  category?: string; // Optional category
  date: Date;        // Date when the post was created
  comments: string[]; // Array of comments
}