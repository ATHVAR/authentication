import { Component, OnInit } from '@angular/core';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  users: any[] = [];

  constructor(private userDataService: UserdataService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.userDataService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
        // Handle error if necessary
      }
    );
  }
  fetchUsers(): void {
    this.userDataService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
        // Handle error if necessary
      }
    );
  }
  deleteUser(userId: string): void {
    this.userDataService.deleteUser(userId).subscribe(
      () => {
        // Reload the user list after successful deletion
        this.fetchUsers();
        alert('User Deleted');
      },
      (error) => {
        console.error(error);
        // Handle error if necessary
      }
    );
  }
}

