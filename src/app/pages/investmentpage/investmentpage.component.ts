import { Investment } from './../../models/investment';
import { Component } from '@angular/core';
import { CreateInvestmentComponent } from "../../dialogs/create-investment/create-investment.component";
import { CommonModule } from '@angular/common';
import { InvestmentService } from '../../services/investment.service';

import { UpdateInvestmentComponent } from "../../dialogs/update-investment/update-investment.component";

@Component({
  selector: 'app-investmentpage',
  standalone: true,
  imports: [CreateInvestmentComponent, CommonModule, UpdateInvestmentComponent],
  templateUrl: './investmentpage.component.html',
  styleUrl: './investmentpage.component.css'
})
export class InvestmentpageComponent {

  openAddInvestDialog = false
  openUpdateInvestDialog = false
  investments:Investment[] = []
  investId!:number
  constructor(private investmentService :InvestmentService){

  }

  ngOnInit(){
    this.investmentService.getInvestmentsOfUser().subscribe(data =>{

      this.investments = data
console.log(this.investments);

    })
  }

  openAddInvestDialogBox(){
    this.openAddInvestDialog = true
  }

  closeInvestDialogBox(event :boolean){
    console.log(event);
    this.openAddInvestDialog = event
  }

  closeUpdateInvestDialogBox(event:boolean){
    this.openUpdateInvestDialog = event
  }
  openUpdateInvestDialogBox(investmentId:number){
    this.openUpdateInvestDialog = true
    this.investId=investmentId
  }

  deleteInvestment(investId:number){
    this.investmentService.deleteInvestment(investId).subscribe(data =>{
      console.log("investment deleted");

      window.location.reload()

    })

  }
}
