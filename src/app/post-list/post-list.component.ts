import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PostFormComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  searchTerm: string = ''; // Search term for filtering
  newComment: { [postId: number]: string } = {}; // Track comments for each post
  postToEdit: Post | null = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  // Filter posts by title or content based on searchTerm
  filteredPosts(): Post[] {
    return this.posts
      .filter((post) =>
        (post.title + post.content)
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date
  }

  editPost(post: Post) {
    this.postToEdit = { ...post };
  }

  deletePost(id: number) {
    this.postService.deletePost(id);
  }

  addComment(postId: number) {
    const comment = this.newComment[postId]?.trim();
    if (comment) {
      this.postService.addComment(postId, comment);
      this.newComment[postId] = '';
    }
  }
}
