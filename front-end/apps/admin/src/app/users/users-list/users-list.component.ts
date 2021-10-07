import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '@front-end/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/edit/${userId}`);
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to proceed?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          (res: User) => {
            this.getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `User ${res.name} is deleted`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted',
            });
          }
        );
      },
    });
  }

  getCoutryName(key: string) {
    if (key) return this.usersService.getCountry(key);
    else return '';
  }
}
