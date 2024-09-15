import { Component } from '@angular/core';
import { ExpensesServiceService } from '../../services/expenses-service.service';
import { Account } from '../../models/account';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Record } from '../../models/record';

@Component({
  selector: 'app-create-record',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-record.component.html',
  styleUrl: './create-record.component.css'
})
export class CreateRecordComponent {

  accounts : Account[] = []
  categories : Category[] = []

  currentDatetime!:string

  recordForm! :FormGroup

  recordType:string=''


  record : Record = new Record()

  constructor(private expensesService:ExpensesServiceService, private fb:FormBuilder){

    this.recordForm = this.fb.group({
      id:[],
      amount:[],
      recordType:['EXPENSE'],
      category_id:[0],
      account_id:[0],
      localdate:[this.currentDatetime],
      reason : []
    })

  }
  ngOnInit(){

    const now = new Date()

    this.currentDatetime = now.toISOString().slice(0,16)

    this.expensesService.getAllAccounts().subscribe(data =>{
      this.accounts = data
    })

    this.expensesService.getAllCategories().subscribe(data => {
      this.categories = data
    })
  }


  selectIncomeType(type:string){
    this.recordType = type
    console.log(this.recordType);
    this.recordForm.value.recordType = this.recordType
  }

  selectExpenseType(type:string){
    this.recordType = type
    console.log(this.recordType);

    this.recordForm.value.recordType = this.recordType
  }

  clearForm(){
    this.recordForm.value.account_id=0
    this.recordForm.value.category_id =0
    this.recordForm.value.amount = 0
    this.recordForm.value.recordType = 'EXPENSE'
    this.recordForm.value.reason = ''
  }

  submitRecordForm(){
    console.log(this.recordForm.value);


    this.record.account.id = this.recordForm.value.account_id
    this.record.category.id = this.recordForm.value.category_id
    this.record.amount = this.recordForm.value.amount
    this.record.recordType = this.recordForm.value.recordType
    this.record.reason = this.recordForm.value.reason

    if(this.record.category.id == 0 || this.record.account.id== 0 || this.record.category.id ==null || this.record.account.id==null ||this.record.amount==null || this.record.recordType==null ){
      alert("any of these detailes missing (account, category, amount, record type)")
    }

    this.expensesService.createRecord(this.record).subscribe(data =>{
      console.log(data);

    })
  }

}
