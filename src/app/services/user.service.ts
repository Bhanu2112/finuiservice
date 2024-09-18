import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Namefsid } from '../models/namefsid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId = localStorage.getItem('userId') || 'null'
  constructor(private http:HttpClient) { }

  getGroupMemberDetailes(memberId:number){
    return this.http.get<Namefsid>(`https://finuserservie.onrender.com/user/namefsid/${memberId}`)
  }
  getUserByEmail(email:string):Observable<User | null>{
    return this.http.get<User>(`https://finuserservie.onrender.com/user/findbyemail/${email}`).pipe(
      catchError(() => {
        return of(null)
      })
    );
  }

  getProfile():Observable<User>{
    return this.http.get<User>(`https://finuserservie.onrender.com/user/findbyid/${this.userId}`)
  }
}
