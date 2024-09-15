import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { Category } from '../models/category';
import { Exprecords } from '../models/exprecords';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class ExpensesServiceService {

  userId=JSON.parse(localStorage.getItem('userId') || 'null');

  constructor(private http :HttpClient) { }

  getAllAccounts() :Observable<Account[]>{
    return this.http.get<Account[]>(`https://finexpenseservice.onrender.com/accounts/${this.userId}`);
  }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`https://finexpenseservice.onrender.com/categories/${this.userId}`);
  }

  addCategory(cat:Category){
    cat.userId = this.userId
    return this.http.post<Category>('https://finexpenseservice.onrender.com/category/create',cat);
  }


  addAccount(act:Account){
    act.userId=this.userId
    return this.http.post<Account>('https://finexpenseservice.onrender.com/create/account',act)
  }


  getAllExpensesOfMonth(month:number,year:number):Observable<Exprecords>{
    return this.http.get<Exprecords>(`https://finexpenseservice.onrender.com/records/exp-records?month=${month}&year=${year}&memberId=${this.userId}`)
  }


  createRecord(record:Record){
    record.userId = this.userId
    return this.http.post(`https://finexpenseservice.onrender.com/records/create/record`,record)
  }
}
