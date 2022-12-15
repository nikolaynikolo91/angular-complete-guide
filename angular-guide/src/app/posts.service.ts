import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs';
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
      postData,
      { observe: 'response' }
    );
  }

  fetchPosts() {
    //  multiple params
    // let searchParams = new HttpParams();
    // searchParams = searchParams.append('print', 'pretty');
    // searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(BASE_URL + POSTS + URL_END, {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty'),
        // params: searchParams
      })
      .pipe(
        map((resData) => {
          const postsArray: Post[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              postsArray.push({ ...resData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((err, caught) => {
          throw err;
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(BASE_URL + POSTS + URL_END, { observe: 'events' })
      .pipe(
        tap((event) => {
          console.log(event);

          if (event.type === HttpEventType.Sent) {
            //....
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
