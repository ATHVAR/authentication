import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  notification={
    notificationmess:''
  }
  constructor(public serv:NotificationService){  }
  ngOnInit(): void {

  }

  submit(){
    this.serv.addmessage(this.notification).subscribe((res=>{
      alert("message posted");
    }))
  }
}
