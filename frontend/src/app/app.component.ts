import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { SidebarService } from './sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private readonly sidebarService: SidebarService,
    private readonly authService: AuthService
  ) {}

  toggle() {
    this.sidebarService.toggle();
  }

  getUserName() {
    return this.authService.getCurrentUserName();
  }

  isAuthed() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
