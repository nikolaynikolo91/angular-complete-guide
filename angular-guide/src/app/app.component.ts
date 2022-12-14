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

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe((post) => {
      this.isLoading = false;
      this.loadedPosts = post;
    });
  }

  onCreatePost(postData: Post) {
    this.postService
      .createAndStorePosts(postData.title, postData.content)
      .subscribe(console.log);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe((post) => {
      this.isLoading = false;
      this.loadedPosts = post;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(()=> {
      this.loadedPosts = []
    })
  }
}
