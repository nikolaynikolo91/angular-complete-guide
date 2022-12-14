import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isLoading = false;
  error = null;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe({
      next: (post) => {
        this.isLoading = false;
        this.loadedPosts = post;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  onCreatePost(postData: Post) {
    this.postService
      .createAndStorePosts(postData.title, postData.content)
      .subscribe(console.log);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe({
      next: (post) => {
        this.isLoading = false;
        this.loadedPosts = post;
      },
      error: (error) => {
        console.log('yes')
        this.isLoading = false;
        this.error = error.message;
        console.log(error, 'error')
      },
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
  onHandleError(){
    this.error = null;
    this.isLoading = false
  }
}
