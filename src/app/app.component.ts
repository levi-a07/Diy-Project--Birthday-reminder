
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
empName:string='';

setEmpName($event: { name: string; }) {
  	this.empName = $event.name;
  }


  title = 'eventapp';


constructor(private router: Router, private auth: AuthService) {

  const userName=String(localStorage.getItem('username') || '');
  this.userLoggedIn = userName.charAt(0).toUpperCase() + userName.slice(1);
}
isloggedIn=false;
isAdmin=false;
userLoggedIn:string='';
ngOnInit(): void {
  this.isloggedIn=this.auth.isUserLoggedIn();
 this.isAdmin=this.auth.isAdmin();
}


ngDoCheck(): void {
 
 this.isloggedIn=this.auth.isUserLoggedIn();
this.isAdmin=this.auth.isAdmin();
}
 //methods to logout user and clear localstorage

 logout() {
 
 this.isloggedIn=!this.isloggedIn;
this.router.navigate(['login']);
  localStorage.clear();
   
 }




}
