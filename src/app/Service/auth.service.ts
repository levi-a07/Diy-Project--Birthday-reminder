import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin(): boolean {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    return false;}

  isUserLoggedIn(): boolean {
    if (localStorage.getItem('role') === null  ) {
      return false;
    }
    return true;  
  
  }

  constructor() { }
}
