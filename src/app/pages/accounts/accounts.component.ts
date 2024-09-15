import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AddAccountComponent } from "../../dialogs/add-account/add-account.component";
import { ViewAccountDetailesComponent } from "../../dialogs/view-account-detailes/view-account-detailes.component";
import { ExpensesServiceService } from '../../services/expenses-service.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FontAwesomeModule, AddAccountComponent, ViewAccountDetailesComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  faTrash = faTrash
  faPenTOSquare = faPenToSquare
  faEye = faEye

  openAddActDialog = false
  openViewActDetailesDialog = false

  allAccounts!: Account[]



  constructor(private expenseService:ExpensesServiceService){

  }

  ngOnInit(){
      this.expenseService.getAllAccounts().subscribe(data => {

        this.allAccounts = data
        console.log(this.allAccounts);

      })
  }


  openAddActDialogBox(){
    this.openAddActDialog = true
  }


  openViewActDetailesDialogBox(){
    this.openViewActDetailesDialog = true
  }

  closeActDialogBox(event :boolean){
    console.log(event);
    this.openAddActDialog = event
  }






  closeViewActDetailesDialog(event : boolean){
    console.log(event);
    this.openViewActDetailesDialog = event

  }

}
