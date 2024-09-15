import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Investment } from '../models/investment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  userId = JSON.parse(localStorage.getItem('userId') || 'null');

  constructor(private http:HttpClient) { }

  createInvestment(investment:Investment):Observable<Investment>{

    return this.http.post<Investment>("https://finexpenseservice.onrender.com/createinvestment",investment);

  }

  getInvestmentsOfUser():Observable<Investment[]>{
    return this.http.get<Investment[]>(`https://finexpenseservice.onrender.com/allinvestments/${this.userId}`)
  }

  getInvestment(investId:number):Observable<Investment>{
    return this.http.get<Investment>(`https://finexpenseservice.onrender.com/invest/${investId }`)
  }

  deleteInvestment(investId:number){
    return this.http.delete(`https://finexpenseservice.onrender.com/invest/delete/${investId}`)
  }
}
