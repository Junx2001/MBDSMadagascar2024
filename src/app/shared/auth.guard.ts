import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  //injection service d'authentification
  const authService = inject(AuthService);
  // injection du router
  const router = inject(Router);

  return authService.isAdmin()
  .then((admin) => {
      if (admin) {
        console.log("GUARD : Navigation autorisée");
        return true;
      } else {
        console.log("GUARD : Navigation NON autorisée");
        router.navigate(['/home']);
        return false;
      }
    }
  );

};
