import { routes } from './app.routes';
import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const token = localStorage.getItem('token') || 'null';
  console.log(token);

  const router = inject(Router)
 if(token !=='null'){

  console.log("token is there");

  return true;
 }else{
  console.log("token is not there");

  router.navigate(['/login'])
 }
  return true;
};
