import { Component } from '@angular/core';
import { FeatureCardsComponent } from "../feature-cards/feature-cards.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeatureCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isAuthenticated = false
  ngOnInit(){
    let userId =  localStorage.getItem('userId')
    if(userId!==null){
      this.isAuthenticated = true
    }
  }
}
