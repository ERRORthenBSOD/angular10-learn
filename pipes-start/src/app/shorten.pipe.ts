import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number): any {
    if (value.length > limit) {
      return value.substr(0, limit) + "...";
    } else {
      return value;
    }
  }
}
