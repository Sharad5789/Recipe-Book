import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authenticateSerivce: AuthenticateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authenticateSerivce.user.pipe(take(1), exhaustMap(user => {
      if(!user){
        return next.handle(req);
      }
      const modifyReq = req.clone({
        params: new HttpParams().set('auth', user.token)
      });  
      return next.handle(modifyReq);
    })
    );
  }


}
