import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const auth = inject(AuthService);
  const user = inject(UserService);
  if (auth.isAuthenticated()) {
    const role = user.getRole();
    if (route.data['role'].indexOf(role) === -1) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
  router.navigate(['login']);
  return false;
};
