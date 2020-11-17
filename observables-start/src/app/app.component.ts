import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}
  activatedEmitter: Subscription;
  userActivated = false;
  ngOnInit() {
    this.activatedEmitter = this.userService.activatedEmitter.subscribe(
      (didActivate) => {
        this.userActivated = didActivate;
      }
    );
  }
  ngOnDestroy() {
    this.activatedEmitter.unsubscribe();
  }
}
