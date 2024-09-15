import { Component } from '@angular/core';
import { SplitserviceService } from '../../services/splitservice.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { CommonModule } from '@angular/common';
import { GroupRequest } from '../../models/group-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {

  memberfsid:string=''

  groupMembers:User[] = []

  groupForm!:FormGroup

  group:Group = new Group()

  groupRequest:GroupRequest = new GroupRequest()

  constructor(private splitService:SplitserviceService, private fb:FormBuilder , private router:Router){

    this.groupForm = this.fb.group({
      groupName:[''],
      amount:[],
      reason:['']
    })


  }


  selectGroupMember(){
    this.splitService.getMemberByfsid(this.memberfsid).subscribe(data =>{

      let selectMember:User = data
      console.log(selectMember);
      this.groupMembers.push(selectMember)
      this.memberfsid = ''

    })
    console.log(this.groupMembers);

  }

  removeMember(id:number){
    this.groupMembers = this.groupMembers.filter(m => m.id!==id)
    console.log(this.groupMembers);

  }


  submitSplitForm(){
   console.log(this.groupForm.value);


   this.groupRequest.groupName = this.groupForm.value.groupName
   this.groupRequest.amount = this.groupForm.value.amount
   this.groupRequest.reason = this.groupForm.value.reason

   this.groupMembers.forEach(m => this.groupRequest.memberIds.push(m.id))


   this.splitService.createSplitGroup(this.groupRequest).subscribe(data =>{
    alert("The group '" + data.groupName + "' has been successfully created.");
      this.router.navigate([`/viewgroup`],{queryParams:{id:data.id}})
   })
  }

}
