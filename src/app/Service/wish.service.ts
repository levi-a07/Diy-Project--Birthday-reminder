import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWish } from '../user-event/Wish';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }


  sendWish(wish:IWish):Observable<Boolean>{
    return this.http.post<Boolean>("http://localhost:8080/wish/saveWish",wish);
  }


}
