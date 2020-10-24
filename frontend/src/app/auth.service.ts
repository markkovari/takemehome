import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './login/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User;
  constructor(
    private readonly jwtHelperService: JwtHelperService,
    private readonly router: Router
  ) {}

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUserName() {
    return this.currentUser.name;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }

  public logout(): void {
    this.deleteToken();
    this.router.navigate(['/login']);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    localStorage.getItem('token');
  }
}
