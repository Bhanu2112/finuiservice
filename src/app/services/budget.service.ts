import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { BudgetManager } from '../models/budget-manager';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {


   userId = JSON.parse(localStorage.getItem('userId') || 'null');

  constructor(private http : HttpClient) { }

  getBudgetsOfMonth(monthYear:string):Observable<BudgetManager | null>{

    return this.http.get<BudgetManager>(`https://finexpenseservice.onrender.com/budget/bm/user?monthYear=${monthYear}&userId=${this.userId}`)
    .pipe(
      catchError(() =>{
        return of(null)
      })
    );
  }

  saveBudget(budget:Budget){
    return this.http.post<Budget>('https://finexpenseservice.onrender.com/budget/save',budget)
  }

}
