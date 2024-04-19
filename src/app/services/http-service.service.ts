import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  // baseUrl = "http://localhost:6000/"
  
  constructor(private http:HttpClient) { }

  registerUser(body:any){
    debugger;
    return this.http.post<any>(`auth/register`,body);
  }

  loginUser(body:any){
    return this.http.post<any>(`auth/login`,body);
  }

  getAllUsers(){
    return this.http.get<any>(`user/`);
  }
  
}
