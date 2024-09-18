import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { AuthReqest } from '../../models/auth-reqest';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authReq : AuthReqest = new AuthReqest()

  authForm!:FormGroup
  user:User = new User()

  constructor(private authService:AuthService , private fb:FormBuilder , private userService:UserService , private router:Router){
    this.authForm = this.fb.group({
      email:[],
      password:[]
    })

  }


  handleLogin(){
    this.authReq.email = this.authForm.value.email
    this.authReq.password = this.authForm.value.password
    console.log(this.authReq);

    this.authService.userLogin(this.authReq).subscribe(msg =>{
      console.log(msg);

      if(msg === null){
        alert('please enter correct email and password')

      }else{
        localStorage.setItem('token',msg)
        this.userService.getUserByEmail(this.authReq.email).subscribe(data =>{
          if(data!=null){
          this.user = data
          console.log(this.user)
          localStorage.setItem('userId',JSON.stringify(this.user.id))
          this.router.navigate(['/'])
          }
        });



      }

    })
  }
}
