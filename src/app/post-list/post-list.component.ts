import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for ngFor and ngIf
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      console.log('Posts updated:', posts); // Debugging log
      this.posts = posts;
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id);
  }
}
