import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Post } from './post.model';

const BASE_URL =
  'https://ng-guilde-complete-default-rtdb.europe-west1.firebasedatabase.app/';
const POSTS = 'posts';
const URL_END = '.json';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title, content };

    return this.http.post<{ name: string }>(
      BASE_URL + POSTS + URL_END,
      postData
    );
  }

  fetchPosts() {
    return this.http
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
      );
  }
}
