import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = "";
  private errSub: Subscription;
  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errSub = this.postsService.errorMessage.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        this.error = error;
      }
    );
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePosts(postData.title, postData.content);
  }

  async onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        this.error = error;
      }
    );
  }

  async onClearPosts() {
    try {
      // Send Http request
      await this.postsService.deletePosts();
      this.loadedPosts = [];
    } catch (e) {
      console.log("ERROR IN DELETE POSTS", e);
    }
  }
  onHandleError() {
    this.error = "";
  }
}
