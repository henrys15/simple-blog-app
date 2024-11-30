import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
  category?: string; // Optional category field
  date: Date;        // Date when the post was created
  comments: string[]; // Array of comments
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = []; // Array to store posts
  private postsSubject = new BehaviorSubject<Post[]>([]); // BehaviorSubject to track posts

  // Method to get posts as an observable
  getPosts() {
    return this.postsSubject.asObservable(); // Return posts as an observable
  }

  // Method to add a new post
  addPost(title: string, content: string, category?: string): void {
    const newPost: Post = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      content,
      category,
      date: new Date(), // Current date
      comments: [],     // Initialize with an empty array of comments
    };
    this.posts.push(newPost);
    this.postsSubject.next([...this.posts]);
  }

  // Method to update an existing post
  updatePost(id: number, title: string, content: string, category?: string): void {
    const post = this.posts.find((p) => p.id === id); // Find the post by ID
    if (post) {
      post.title = title; // Update the title
      post.content = content; // Update the content
      post.category = category; // Update the category
      this.postsSubject.next([...this.posts]); // Notify subscribers with the updated list
    }
  }

  // Method to delete a post by ID
  deletePost(id: number): void {
    this.posts = this.posts.filter((post) => post.id !== id); // Remove the post with the matching ID
    this.postsSubject.next([...this.posts]); // Notify subscribers with the updated list
  }

  // Method to add a comment to a post
  addComment(postId: number, comment: string): void {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.comments.push(comment); // Add the new comment
      this.postsSubject.next([...this.posts]); // Notify subscribers
    }
  }
}
