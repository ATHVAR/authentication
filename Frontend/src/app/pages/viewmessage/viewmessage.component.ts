import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.css']
})
export class ViewmessageComponent implements OnInit{
  notification:any;
  constructor(public serv:NotificationService){}
  ngOnInit(): void {
    this.serv.viewmessage().subscribe((data=>{
      this.notification=data;
      console.log(this.notification)
    }))
  }
  
  delmess(id:any){
  this.serv.delmessage(id).subscribe(data=>console.log(data))
  alert('message deleted')
  }
}
