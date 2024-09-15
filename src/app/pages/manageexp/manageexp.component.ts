import { Component } from '@angular/core';
import { ExpensesServiceService } from '../../services/expenses-service.service';
import { Exprecords } from '../../models/exprecords';
import { Record } from '../../models/record';

@Component({
  selector: 'app-manageexp',
  standalone: true,
  imports: [],
  templateUrl: './manageexp.component.html',
  styleUrl: './manageexp.component.css'
})
export class ManageexpComponent {
  currentMonth!: number;
  currentYear!: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  exprecords:Exprecords = {}

  records:Map<string,Record[]> = new Map()

  recordsArray:{date:string,records:Record[]}[] = []

  totalIncome : number = 0
  totalExpenses : number = 0
  cashFlow:number = 0

  constructor(private expensesService:ExpensesServiceService){

  }

  ngOnInit(){
    const today = new Date();
    console.log(today.getFullYear());

    this.currentMonth = today.getMonth(); //0-11
    this.currentYear = today.getFullYear();

    this.getAllExpensesOfMonth(this.currentMonth+1,this.currentYear)


  }


  getAllExpensesOfMonth(month:number,year:number){
    this.expensesService.getAllExpensesOfMonth(month,year).subscribe((data:Exprecords) =>{
      console.log(data);

     this.exprecords = data

     this.processExprecords()

    this.records = new Map()
    })
  }
  processExprecords(): void {
    for (const date in this.exprecords) {
      this.records.set(date,this.exprecords[date])
    }


    // convert map to array

    this.recordsArray = Array.from(this.records,([date, records]) => ({date,records}))

    console.log(this.recordsArray);

  }



  goToPreviousMonth(){

    if(this.currentMonth===0){
      this.currentMonth = 11
      this.currentYear--;
    }else{
      this.currentMonth--;
    }

    this.getAllExpensesOfMonth(this.currentMonth+1,this.currentYear)

  }

  goToNextMonth() {

    this.calculateMonthlyTotalIncomeExpenes()
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.getAllExpensesOfMonth(this.currentMonth+1,this.currentYear)
  }


  calculateMonthlyTotalIncomeExpenes(){
    this.totalExpenses = 0
    this.totalIncome = 0
    this.recordsArray.forEach(r =>{
      r.records.forEach(rec =>{
        if(rec.recordType==='INCOME'){
          this.totalIncome = this.totalIncome+rec.amount
        }else{
          this.totalExpenses = this.totalExpenses + rec.amount
        }
      })
    }
    )
  }


}
