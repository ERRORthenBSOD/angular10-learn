import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vCRef.createEmbeddedView(this.templateRef);
    } else {
      this.vCRef.clear();
    }
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private vCRef: ViewContainerRef
  ) {}
}
