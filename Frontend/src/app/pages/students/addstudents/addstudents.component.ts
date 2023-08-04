import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentdataService } from 'src/app/shared/studentdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.css']
})
export class AddstudentsComponent implements OnInit{

  buttoncontrol=true;
  studdetail={
    id:'',
    name:'',
    course:'',
    project:'',
    batch:'',
    status:'',
    placement:''
  }
  constructor(public serv:StudentdataService,public router:Router){}
  ngOnInit(): void {
    
  }
  submit(){
    this.serv.addstudent(this.studdetail).subscribe((res=>{
      alert("Student Added");
      this.router.navigate(['viewstuds']);
    }))
  }
}
