import { Component, Input, OnChanges } from '@angular/core';
import { PostService, Post } from '../post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'], 
})
export class PostFormComponent implements OnChanges {
  @Input() postToEdit: Post | null = null; // Post to edit

  title = '';
  content = '';
  category = '';

  constructor(private postService: PostService) {}

  ngOnChanges() {
    if (this.postToEdit) {
      // Populate form fields when editing
      this.title = this.postToEdit.title;
      this.content = this.postToEdit.content;
      this.category = this.postToEdit.category || '';
    }
  }

  onSubmit() {
    if (this.postToEdit) {
      // Update the post
      this.postService.updatePost(
        this.postToEdit.id,
        this.title,
        this.content,
        this.category
      );
      this.postToEdit = null; // Clear edit mode
    } else {
      // Add a new post
      this.postService.addPost(this.title, this.content, this.category);
    }
    // Clear the form fields
    this.title = '';
    this.content = '';
    this.category = '';
  }
}
