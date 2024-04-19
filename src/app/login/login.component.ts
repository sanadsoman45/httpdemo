import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatashareService } from '../services/dataservice/datashare.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb:FormBuilder, private httpService:HttpServiceService, private router:Router, private route: ActivatedRoute, private accessTokenSubject: DatashareService){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['', Validators.required]
    });
  }

  loginUser(){
    

    console.log(isPlatformServer(this.platformId));

    var user = {
      'emailId':this.loginForm.controls['email'].value,
      'password':this.loginForm.controls['password'].value
    }

    this.httpService.loginUser(user).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.accessTokenSubject.setAuthToken(response['AccessToken']);
        this.router.navigate(["/getuser"]);
      },
      error:(error)=>{
        console.log(`Error has occured`);
      },
      complete:()=>{
        console.log("Completed");
      }
    });
  }

  signup(){
    this.router.navigate(['/signup',{relativeTo:this.route}]);
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loginUser();
    }
  }

}
