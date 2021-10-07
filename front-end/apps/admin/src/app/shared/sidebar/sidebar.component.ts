import { Component, OnInit } from '@angular/core';
import { AuthService } from '@front-end/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private authService: AuthService) {}


  logoutUser() {
    this.authService.logout();
  }
}
