import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  public errorMessage = new Subject<string>();
  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(
        "https://angular10udemy.firebaseio.com/posts.json",
        postData,
        {
          observe: "response",
        }
      )
      .subscribe(
        (res) => {
          console.log({ res });
        },
        (error) => {
          this.errorMessage.next(error.message);
        }
      );
  }

  fetchPosts() {
    let params = new HttpParams();
    params = params.append("print", "pretty");
    params = params.append("custom", "test");

    return this.http
      .get<{ [key: string]: Post }>(
        "https://angular10udemy.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
          // params: new HttpParams().set("print", "pretty"),
          params,
        }
      )
      .pipe(
        map((resp) => {
          const postsArray: Post[] = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              postsArray.push({ ...resp[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((err) => throwError(err))
      );
  }

  deletePosts() {
    return this.http
      .delete<{ [key: string]: Post }>(
        "https://angular10udemy.firebaseio.com/posts.json",
        {
          observe: "events",
          reportProgress: true,
          responseType: "json",
        }
      )
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            console.log({ event: event });
          }
          if (event.type === HttpEventType.DownloadProgress) {
            console.log({ download: event });
          }
          if (event.type === HttpEventType.Response) {
            console.log({ eventBody: event.body });
          }
        })
      )
      .toPromise();
  }
}
