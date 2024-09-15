import { routes } from './app.routes';
import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const token = localStorage.getItem('token') || 'null';

  const router = inject(Router)
 if(token !==null){
  return true;
 }else{
  router.navigate(['/login'])
 }
  return true;
};
