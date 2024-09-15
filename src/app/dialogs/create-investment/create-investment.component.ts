import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpensesServiceService } from '../../services/expenses-service.service';
import { InvestmentService } from '../../services/investment.service';
import { Investment } from '../../models/investment';

@Component({
  selector: 'app-create-investment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-investment.component.html',
  styleUrl: './create-investment.component.css'
})
export class CreateInvestmentComponent {

  @Output() closeInvestDialog = new EventEmitter<boolean>();

  investForm!  : FormGroup

  investment:Investment = new Investment()



  constructor(private fb:FormBuilder,
    private expensesService:ExpensesServiceService,
     private investmentService:InvestmentService
    ){

    this.investForm = this.fb.group({
      title : [''],
      investmentAmtGoal : [0],
      amtInvested:[0]
    })

  }

  ngOnInit(){

  }

  handleInvestmentDialog(){

    this.closeInvestDialog.emit(false);

  }


  onSubmitInvestForm(){

    console.log(this.investForm.value);

    this.investment.title = this.investForm.value.title
    this.investment.investmentAmtGoal = this.investForm.value.investmentAmtGoal
    this.investment.userId = 1

    this.investmentService.createInvestment(this.investment).subscribe(data =>{

      window.location.reload()

    })



  }
}
