import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  // Pour pouvoir appeller la fonction => this.authService.isAdmin().then(...) ou admin = await this.authService.isAdmin();
  isAdmin() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);

      //pas de cas d'erreur , donc pas de reject
    });

    return promise;
  }

  constructor() { }
}
