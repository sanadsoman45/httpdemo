import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { DatashareService } from "../services/dataservice/datashare.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{

    constructor(private accessTokenSubject: DatashareService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var authToken = "";
        this.accessTokenSubject.loginData.subscribe((data)=>{
            authToken = data;
        });

        if(authToken){
            const authReq = req.clone({
                setHeaders:{
                    Authorization: authToken
                }
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }

}