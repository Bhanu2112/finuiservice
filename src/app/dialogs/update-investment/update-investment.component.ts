import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpensesServiceService } from '../../services/expenses-service.service';
import { InvestmentService } from '../../services/investment.service';
import { Investment } from '../../models/investment';

@Component({
  selector: 'app-update-investment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-investment.component.html',
  styleUrl: './update-investment.component.css'
})
export class UpdateInvestmentComponent {

  @Output() closeUpdateInvestDialog = new EventEmitter<boolean>();

  @Input() investId!:number

  investUpdateForm!:FormGroup

  investment:Investment = new Investment()

  constructor(private fb:FormBuilder, private expensesService:ExpensesServiceService,private investmentService:InvestmentService){

    this.investUpdateForm = this.fb.group({
      id:[0],
      title : [''],
      investmentAmtGoal : [0],
      amtInvested:[0]
    })

  }

  ngOnInit(){
    console.log(this.investId);
    this.investmentService.getInvestment(this.investId).subscribe(data =>{
      this.investment = data
      console.log(this.investment);

    })


  }


  onSubmitInvestUpdateForm(){
    console.log(this.investUpdateForm.value);
    this.investment.amtInvested =this.investment.amtInvested + this.investUpdateForm.value.amtInvested

    this.investmentService.createInvestment(this.investment).subscribe(data =>{
      console.log("investment updated");
      window.location.reload()

    })

  }


  handleUpdateInvestmentDialog(){
    this.closeUpdateInvestDialog.emit(false)
  }
}
