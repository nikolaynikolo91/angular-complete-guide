import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post(BASE_URL + POSTS + URL_END, postData).subscribe(console.log);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get(BASE_URL + POSTS + URL_END).subscribe(console.log);
  }
}
