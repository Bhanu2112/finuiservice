import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  //debugger
  const authToken = localStorage.getItem('token')
  const clonedReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${authToken}`,
    }
  })
  console.log(clonedReq);

  return next(clonedReq);
};
