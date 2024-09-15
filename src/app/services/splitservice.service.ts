import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { Reqsettel } from '../models/reqsettel';
import { User } from '../models/user';
import { GroupRequest } from '../models/group-request';

@Injectable({
  providedIn: 'root'
})
export class SplitserviceService {


  userId = JSON.parse(localStorage.getItem('userId') || 'null');

  constructor(private http:HttpClient) { }

  getGroups(){
    return this.http.get(`https://finexpenseservice.onrender.com/member/${this.userId}`)
  }


  viewGroup(groupid:number):Observable<Group>{
    return this.http.get<Group>(`https://finexpenseservice.onrender.com/group?groupid=${groupid}`)
  }




  getAllRequestsAndSettlementsOfMember(memberId:number):Observable<Reqsettel[]>{
      return this.http.get<Reqsettel[]>(`https://finexpenseservice.onrender.com/reqsettlel/${this.userId}`)
  }

  updatePaymentStatus(memberId:number){
    return this.http.get(`https://finexpenseservice.onrender.com/update/payment/status/${memberId}`,{responseType:'text'})
  }


  getMemberByfsid(fsid:string):Observable<User>{

    return this.http.get<User>(`https://finuserservie.onrender.com/http://localhost:8085/user/findbyfsid/${fsid}`)
  }


  createSplitGroup(groupRequest:GroupRequest):Observable<Group>{
    groupRequest.userId = this.userId
    groupRequest.memberIds.push(this.userId)
    console.log(groupRequest);

    return this.http.post<Group>(`https://finexpenseservice.onrender.com/creategroup`,groupRequest)
  }
}
