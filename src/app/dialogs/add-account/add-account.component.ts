import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpensesServiceService } from '../../services/expenses-service.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent {


  @Output() closeActDialog = new EventEmitter<boolean>();


  accountForm! : FormGroup

  act= new Account();


  constructor(private fb:FormBuilder, private expensesService:ExpensesServiceService){

    this.accountForm = this.fb.group({
      accountName : [''],
      balance : [0]
    })

  }

  handleCloseActDialog(){
    this.closeActDialog.emit(false)
  }

  onSubmitActForm(){
   console.log(this.accountForm.value);

   this.act.accountName = this.accountForm.value.accountName;
   this.act.balance = this.accountForm.value.balance;

     this.expensesService.addAccount(this.act).subscribe(data =>{
      console.log(data);
      window.location.reload()
     })

  }

}
