import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';

const BASE_URL =
  'https://ng-guilde-complete-default-rtdb.europe-west1.firebasedatabase.app/';
const POSTS = 'posts';
const URL_END = '.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ name: string }>(BASE_URL + POSTS + URL_END, postData)
      .subscribe(console.log);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isLoading = true;
    this.http
      .get<{ [key: string]: Post }>(BASE_URL + POSTS + URL_END)
      .pipe(
        map((resData) => {
          const postsArray: Post[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              postsArray.push({ ...resData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((posts) => {
        this.isLoading = false;
        this.loadedPosts = posts;
      });
  }
}
