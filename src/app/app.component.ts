import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureCardsComponent } from "./components/feature-cards/feature-cards.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeatureCardsComponent, HomeComponent, LoginComponent, RegisterComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uiservice';
}
