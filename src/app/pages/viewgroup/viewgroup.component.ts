import { Component } from '@angular/core';
import { SplitserviceService } from '../../services/splitservice.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../models/group';
import { Member } from '../../models/member';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { firstValueFrom } from 'rxjs';
import { Namefsid } from '../../models/namefsid';
import { GroupMember } from '../../models/group-member';

@Component({
  selector: 'app-viewgroup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewgroup.component.html',
  styleUrl: './viewgroup.component.css',
})
export class ViewgroupComponent {
  groupId!: number;
  group = new Group();
  count!: number;
  members: any;
  myMember = new Member();

  appUserId!: number;
  comments:any = []

  groupMember = {
    name: '',
    fsid: '',
    shareamount: 0,
    status: '',
  };

  groupMembers: GroupMember[] = [];

  constructor(
    private splitService: SplitserviceService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit() {

    this.appUserId = this.splitService.userId;

    this.route.queryParams.subscribe((val) => {
      this.groupId = val['id'];
    });

    this.splitService.viewGroup(this.groupId).subscribe((data) => {
      console.log(data);

      this.group = data;
      let coms = this.group.comments
      this.comments =coms
      console.log(this.comments);

      this.count = this.group.groupMembers.length;

      this.group.groupMembers
        .filter((gm) => gm.userId === this.appUserId)
        .forEach((m) => (this.myMember = m));

      this.group.groupMembers.forEach((m) => {

        let nameFsid: Namefsid;

        let groupMember: GroupMember = new GroupMember();
        this.userService.getGroupMemberDetailes(m.userId).subscribe((data) => {
          nameFsid = data;



          groupMember.fsid = nameFsid.fsid;
          groupMember.name = nameFsid.name;
          groupMember.userId = nameFsid.userId
        });

        groupMember.id = m.id
        groupMember.status = m.paymentStatus;
        groupMember.shareamount = m.shareAmount;

        this.groupMembers.push(groupMember);
      });
    });
  }



  updatePaymentStatus(memberId:number){
    this.splitService.updatePaymentStatus(memberId).subscribe(msg =>{
     alert(msg)
     window.location.reload()

    })
  }
}
