import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ManageexpComponent } from './pages/manageexp/manageexp.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { BillsplitterComponent } from './pages/billsplitter/billsplitter.component';
import { ViewgroupComponent } from './pages/viewgroup/viewgroup.component';
import { InvestmentpageComponent } from './pages/investmentpage/investmentpage.component';
import { CreateRecordComponent } from './pages/create-record/create-record.component';
import { CreateGroupComponent } from './pages/create-group/create-group.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'expenses',
    component : ManageexpComponent,
    canActivate:[authGuard]
  },
  {
    path :'accounts',
    component : AccountsComponent,
    canActivate:[authGuard]
  },
  {
    path : 'categories',
    component : CategoriesComponent,
    canActivate:[authGuard]
  },
  {
    path : 'budgets',
    component : BudgetsComponent,
    canActivate:[authGuard]
  },
  {
    path:'split',
    component : BillsplitterComponent,
    canActivate:[authGuard]
  },
  {
    path:'viewgroup',
    component : ViewgroupComponent,
    canActivate:[authGuard]
  },
  {
    path:'investments',
    component:InvestmentpageComponent,
    canActivate:[authGuard]
  },
  {
    path:'record',
    component:CreateRecordComponent,
    canActivate:[authGuard]
  },
  {
    path:'creategroup',
    component:CreateGroupComponent,
    canActivate:[authGuard]
  }
];
