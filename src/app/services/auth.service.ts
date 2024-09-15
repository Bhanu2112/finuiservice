import { catchError, of } from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReqest } from '../models/auth-reqest';
import { User } from '../models/user';
import { RegisterReq } from '../models/register-req';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  userLogin(authReq:AuthReqest){
    return this.http.post(`https://finuserservie.onrender.com/auth/login`,authReq,{responseType:'text'})
      .pipe(catchError(() => {
        return of(null)
      }))

  }

  userRegistraion(user: RegisterReq) {
    const headers = {
      //'Authorization': `Bearer ${yourAuthToken}`, // Replace with actual token
      'Content-Type': 'application/json'
    };

    return this.http.post(`https://finuserservie.onrender.com/auth/register`, user, { headers, responseType: 'text' });
  }

}
