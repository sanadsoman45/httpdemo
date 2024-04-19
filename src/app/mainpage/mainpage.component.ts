import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { isPlatformServer } from '@angular/common';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit{

  userData:any[]=[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private httpService: HttpServiceService) {}


  ngOnInit(): void {
    console.log("hello");
    console.log(isPlatformServer(this.platformId));
    console.log(this.platformId);
    if (isPlatformServer(this.platformId)) {
      this.getUsers();
     
    }
    
  }

  getUsers(){
    this.httpService.getAllUsers().subscribe({
      next:(data)=>{
        this.userData = data;
        console.log(data);
        console.log(this.userData);
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        console.log("complete");
      }
    });
  }

}
