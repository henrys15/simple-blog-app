import { Component } from '@angular/core';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostFormComponent, PostListComponent],
  template: `
    <h1>Simple Blog App</h1>
    <app-post-form></app-post-form>
    <app-post-list></app-post-list>
  `,
})
export class AppComponent {}
