import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modReq = req.clone({ headers: req.headers.append("Auth", "xyz") });
    console.log("REQUEST_url", modReq.urlWithParams);
    return next.handle(modReq);
  }
}
