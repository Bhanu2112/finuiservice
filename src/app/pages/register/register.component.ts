import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { RegisterReq } from '../../models/register-req';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  user:RegisterReq = new RegisterReq()
  constructor(private fb: FormBuilder ,  private userService:UserService, private authService:AuthService,private router:Router) {
    this.registerForm = this.fb.group({
      email: [],
      password: [],
      confirmPassword:[],
      firstName: [],
      lastName: [],
      mobileNumber: [],
    });
  }

  handelRegistration(){
    this.userService.getUserByEmail(this.registerForm.value.email).subscribe(data =>{
      if(data!=null){
        alert('Given email is alredy present in our system. please use other email')
      }
    })
    console.log(this.registerForm.value);
    this.user.email = this.registerForm.value.email
    this.user.firstName = this.registerForm.value.firstName
    this.user.lastName = this.registerForm.value.lastName
    this.user.password = this.registerForm.value.password
    this.user.mobileNumber = this.registerForm.value.mobileNumber

    console.log(this.user);

    this.authService.userRegistraion(this.user).subscribe(msg =>{
      console.log(msg);
      alert(msg)
      this.router.navigate(['/login'])

    })
  }
}
