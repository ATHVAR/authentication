import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-homedata',
  templateUrl: './homedata.component.html',
  styleUrls: ['./homedata.component.css']
})
export class HomedataComponent implements OnInit {
  notification:any;
  constructor(public serv:NotificationService){}
  ngOnInit(): void {
    this.serv.viewmessage().subscribe((data=>{
      this.notification=data;
      console.log(this.notification)
    }))
  }

}
