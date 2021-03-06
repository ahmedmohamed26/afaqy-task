import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  borderColor = ['#fff', '#00B50C', '#fff', '#EC2F2F'];
  users: Users[] = [];
  activeUsers: Users[] = [];
  percentActiveUsers: number = 0;
  copyArrUsers = [];
  page: number = 1;
  total: number = 0;
  isLoading: boolean = false;
  isShowTooltip: boolean = false;
  tooltipInfo: Users = {};
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.isLoading = true;
    this.usersService.getUsers().subscribe((res: any) => {
      this.copyArrUsers = res;
      this.total = this.copyArrUsers.length;
      this.sortArray(this.copyArrUsers);
      this.users = this.copyArrUsers.slice(0, this.page * 4);
      this.activeUsers = this.copyArrUsers.filter((item: Users) => item.active);
      this.percentActiveUsers =
        (this.activeUsers.length / this.copyArrUsers.length) * 100;
      this.isLoading = false;
    });
  }

  sortArray(arr = []) {
    arr.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  loadMore() {
    this.isLoading = true;
    this.page++;
    this.users = this.copyArrUsers.slice(0, this.page * 4);
    this.isLoading = false;
  }

  goToBookPage(user: Users) {
    this.router.navigate(['/books', user.id]);
  }

  showTooltip(user: Users) {
    this.tooltipInfo = user;
    this.isShowTooltip = true;
  }
  hideTooltip() {
    this.isShowTooltip = false;
  }
}
