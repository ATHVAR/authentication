import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from 'src/app/shared/userdata.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EditUserComponent implements OnInit {
  userId!: string;
  user: any = {};

  constructor(private route: ActivatedRoute, private userDataService: UserdataService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['_id'];
      this.userDataService.getUserById(this.userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error(error);
          // Handle error if necessary
        }
      );
    });
  }

  updateUser(): void {
    this.userDataService.updateUser(this.userId, this.user).subscribe(
      (response) => {
        console.log(response.message);
        // Handle success or navigate to another page
      },
      (error) => {
        console.error(error);
        // Handle error if necessary
      }
    );
  }
}
