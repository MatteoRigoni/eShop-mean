import { Component, OnInit } from '@angular/core';
import { UsersService } from '@front-end/users';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  constructor(private userService: UsersService) {

  }
  ngOnInit(): void {
    this.userService.initStateStore();
  }
}
