import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);

  getPosts() {
    return this.postsSubject.asObservable(); // Return posts as observable
  }

  addPost(title: string, content: string) {
    const newPost: Post = { id: this.posts.length + 1, title, content };
    this.posts.push(newPost);
    this.postsSubject.next([...this.posts]); // Notify subscribers
  }

  deletePost(id: number) {
    this.posts = this.posts.filter((post) => post.id !== id);
    this.postsSubject.next([...this.posts]); // Notify subscribers
  }
}
