import { BudgetManager } from './../../models/budget-manager';
import { Budget } from './../../models/budget';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../models/category';
import { BudgetService } from '../../services/budget.service';
import { BudgetManagerIds } from '../../models/budget-manager-ids';

@Component({
  selector: 'app-create-budget',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-budget.component.html',
  styleUrl: './create-budget.component.css'
})
export class CreateBudgetComponent {
  @Output() closeBudgetDialog = new EventEmitter<boolean>();


  @Input() categoryData!  : Category

  currentMonth!:number
  currentyear!:number
  yearMonth!:string


  budgetForm!: FormGroup

  constructor(private fb:FormBuilder, private budgetService:BudgetService){
    this.budgetForm = this.fb.group({
      limit : []
    })
  }
    ngOnInit(){
      console.log(this.categoryData);
      const today = new Date();
      this.currentMonth = today.getMonth()  // 0-11
      this.currentyear = today.getFullYear()

      this.currentMonth =  this.currentMonth+1;

      if(this.currentMonth<10){
        this.yearMonth = this.currentyear+'-0'+this.currentMonth
      }else{
        this.yearMonth = this.currentyear+'-0'+this.currentMonth
      }
      console.log(this.yearMonth);







    }

  handleCloseDialog(){
    this.closeBudgetDialog.emit(false);
  }





  submitBudget(){
    let budget=new Budget()
    budget.categoryName = this.categoryData.categoryName
    budget.budgetAmount = this.budgetForm.value.limit
    budget.catId = this.categoryData.id

    let budgetManager = new BudgetManager();
    let budgetManagerid = new BudgetManagerIds();


    budgetManagerid.monthYear = this.yearMonth
    budgetManagerid.userId = this.categoryData.userId
    budgetManager.ids = budgetManagerid

    budget.budgetManager = budgetManager

    this.budgetService.saveBudget(budget).subscribe(data =>{
      console.log(data);
      window.location.reload()
    })
  }
}
