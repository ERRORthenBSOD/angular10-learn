import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    AfterContentInit,
    AfterViewInit,
    OnDestroy {
  @Input("srvElement") element: { type: string; name: string; content: string };
  @ViewChild("heading", { static: true }) heading: ElementRef;
  @ContentChild("contentParagraph", { static: true })
  paragraph: ElementRef;
  constructor() {
    console.log("constructor");
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    console.log(
      `Header text content: ${this.heading.nativeElement.textContent}`
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges", { changes });
    console.log(
      `Header text content: ${this.heading.nativeElement.textContent}`
    );
  }

  ngDoCheck() {
    console.log("ngDoCheck");
    console.log(
      `Header text content: ${this.heading.nativeElement.textContent}`
    );
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
    console.log(
      `Header text content: ${this.heading.nativeElement.textContent}`
    );
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
    console.log(
      `Header text content: ${this.heading.nativeElement.textContent}`
    );
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
    console.log(
      `Header text content: ${this.heading.nativeElement.textContent}`
    );
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    console.log(
      `Header text content: ${this.heading.nativeElement.textContent}`
    );
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }
}
