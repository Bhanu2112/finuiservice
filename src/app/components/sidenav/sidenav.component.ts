import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {



  darkMode:boolean = JSON.parse(localStorage.getItem('dark')!) || false;

  hideSideNav = false;
  pageUrl=''
  userMenu = true

  userDetailes:User = new User()

  isAuthenticated = false

  constructor(private router:Router, private userService:UserService){


  }

  ngOnInit(){
      // this.changeTheme()

     let userId =  localStorage.getItem('userId')
     if(userId!==null){
      this.isAuthenticated= true
      this.userService.getProfile().subscribe(data => {
console.log(data);


        this.userDetailes = data
      })
     }


      console.log(this.router.url);

      this.router.events.subscribe( val =>{
        if ( val instanceof NavigationEnd

        ){
          this.pageUrl = this.router.url;
        }
      })
  }


  changeTheme(){
    this.darkMode = !this.darkMode
    localStorage.setItem('dark',JSON.stringify(this.darkMode))
    console.log(this.darkMode);

    if(this.darkMode){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }

  }

  handelSideBar(){

    this.hideSideNav = !this.hideSideNav;
    console.log(this.hideSideNav);

  }

  showUserMenu(){
    this.userMenu = !this.userMenu;
  }


  getProfile(){

  }

  handelLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    alert("Logged out successfully")
  }


  login(){
    this.router.navigate(['/login'])
  }


}
