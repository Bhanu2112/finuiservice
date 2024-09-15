import { Component } from '@angular/core';
import { ExpensesServiceService } from '../../services/expenses-service.service';
import { Category } from '../../models/category';
import { BudgetService } from '../../services/budget.service';
import { BudgetManager } from '../../models/budget-manager';
import { Budget } from '../../models/budget';
import { CommonModule } from '@angular/common';
import { CreateBudgetComponent } from "../../dialogs/create-budget/create-budget.component";

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, CreateBudgetComponent],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css'
})
export class BudgetsComponent {


  openCreateBudget = false

  currentMonth!: number;
  currentYear!: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  budgetedCategories : Budget[] = []

  nonBudgetedCategories : Category[] = []

  categories! : Category[]

  budgetManger : BudgetManager = new BudgetManager()

  monthYear:string = ''
  totalBudgeted:number = 0
  totalSpent:number = 0

  categoryData!: Category
  constructor(private expenseService : ExpensesServiceService, private budgetService:BudgetService){

  }

  ngOnInit(){
    const today = new Date();
    console.log(today.getFullYear());

    this.currentMonth = today.getMonth(); //0-11
    this.currentYear = today.getFullYear();
    this.expenseService.getAllCategories().subscribe(data => {

      this.monthYear = this.currentYear+'-'+(this.currentMonth+1).toString().padStart(2,'0')
      console.log(this.monthYear);

      this.getBudgetsOfMonth(this.monthYear)
      this.categories = data;

       this.categories.filter( c => {
        this.budgetedCategories.forEach(bc => {
         if(c.id !=bc.catId){
          this.nonBudgetedCategories.push(c);
         }
        })
      })

      console.log(this.nonBudgetedCategories);



    })




  }



  getBudgetsOfMonth(monthYear:string){

    console.log(monthYear);

  this.budgetService.getBudgetsOfMonth(monthYear).subscribe(data => {

    if(data!=null){
      this.budgetManger = data
      this.budgetedCategories = this.budgetManger.budgets
    }else{
      this.budgetedCategories = []
    }

    this.budgetedCategories.forEach(c => {
      this.totalBudgeted +=  c.budgetAmount;
      this.totalSpent += c.spent
    })


  });
  }


  goToPreviousMonth(){

    if(this.currentMonth===0){
      this.currentMonth = 11
      this.currentYear--;
    }else{
      this.currentMonth--;
    }
    this.monthYear = this.currentYear+'-'+(this.currentMonth+1).toString().padStart(2,'0')
    this.getBudgetsOfMonth(this.monthYear)
  }

  goToNextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.monthYear = this.currentYear+'-'+(this.currentMonth+1).toString().padStart(2,'0')
    this.getBudgetsOfMonth(this.monthYear)
  }


  openCreateBudgetDialog(cat:Category){
    this.openCreateBudget = true
    console.log(cat);
    this.categoryData = cat

  }
  closeCreateBudgetDialog(event :boolean){
    this.openCreateBudget = event
  }



}
