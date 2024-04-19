import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private httpService:HttpServiceService){

  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      emailid:['',[Validators.required, Validators.email]],
      mobnum:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[{\]};:<>|./?]).{8,}$/)]],
      repassword:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[{\]};:<>|./?]).{8,}$/)]]
    });
  }

  saveUser(){
    const requestBody = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      emailId: this.signupForm.value.emailid,
      mobNum: this.signupForm.value.mobnum,
      password: this.signupForm.value.password
    };
    debugger;
    this.httpService.registerUser(requestBody).subscribe({
      next:(response)=>{
        console.log(response);
        this.resetForm();
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("completed");
      }
    })
  }

  resetForm(){
    this.signupForm.reset();
  }

  onSubmit(){
    if(this.signupForm.valid){
      this.saveUser();
      
    }
  }

}
