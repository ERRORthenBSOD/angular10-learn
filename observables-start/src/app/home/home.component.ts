import { Component, OnDestroy, OnInit } from "@angular/core";

import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  myInterval: Subscription;
  myCustomObservableSub: Subscription;
  myCustomObservable: Observable<any>;
  constructor() {}

  ngOnInit() {
    // this.myInterval = interval(1000).subscribe((count) => {
    //   console.log({ count });
    // });
    this.myCustomObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is greater than 3!!!"));
        }
        count++;
      }, 1000);
    });

    this.myCustomObservable.pipe(
      map((data) => {
        return "Round: " + (data + 1);
      })
    );

    this.myCustomObservableSub = this.myCustomObservable
      .pipe(
        filter((data) => {
          return data > 1;
        }),
        map((data) => {
          return "Round: " + data;
        })
      )
      .subscribe(
        (data) => {
          console.log({ data });
        },
        (err) => {
          alert(err.message);
        },
        () => {
          console.log("Completed");
        }
      );
  }
  ngOnDestroy() {
    // this.myInterval.unsubscribe();
    this.myCustomObservableSub.unsubscribe();
  }
}
