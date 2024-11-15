import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  title = '';
  content = '';

  constructor(private postService: PostService) {}

  onSubmit() {
    console.log('Submitting post:', this.title, this.content); // Debugging
    this.postService.addPost(this.title, this.content);
    this.title = '';
    this.content = '';
  }
}
