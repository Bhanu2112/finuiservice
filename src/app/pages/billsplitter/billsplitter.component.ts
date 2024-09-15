import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitserviceService } from '../../services/splitservice.service';
import { RouterLink } from '@angular/router';
import { Reqsettel } from '../../models/reqsettel';

@Component({
  selector: 'app-billsplitter',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './billsplitter.component.html',
  styleUrl: './billsplitter.component.css'
})
export class BillsplitterComponent {

    appUserId!:number
    groups:any = []
    activeGroups:any = []
    closedGroups:any = []
    reqsettel:Reqsettel[] = []

    constructor(private splitService:SplitserviceService){

    }
    ngOnInit(){
     this.appUserId = this.splitService.userId
      this.splitService.getGroups().subscribe(data =>{
        this.groups = data

        for(let g of this.groups){

          if(g.status==='PENDING'){
            console.log(g);
            this.activeGroups.push(g);

          }else{
            this.closedGroups.push(g);
          }

        }

        // this.closedGroups = this.activeGroups
      })
      this.getRequestsAndSettlements();
    }


    getRequestsAndSettlements(){
      this.splitService.getAllRequestsAndSettlementsOfMember(this.appUserId).subscribe(data =>{
        this.reqsettel = data;
        console.log(this.reqsettel);

      })
    }


    getGroupsData() {
      // Use this method to access groups data after it has been populated
      console.log('Accessing groups data later:', this.groups);
      console.log('Accessing groups push data later:', this.activeGroups);
      // You can now safely use this.groups
      console.log('Accessing closed groups push data later:', this.closedGroups);
      console.log("app user : ", this.appUserId);

    }


}
