import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentdataService } from 'src/app/shared/studentdata.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent {
  editform!:FormGroup
  constructor(private api:StudentdataService,private activatedRoute:ActivatedRoute,private fb:FormBuilder,private router:Router){
    this.editform=new FormGroup({
      "id":new FormControl(""),
      "name":new FormControl(""),
      "course":new FormControl(""),
      "project":new FormControl(""),
      "batch":new FormControl(""),
      "status":new FormControl(""),
      "placement":new FormControl("")
    })
  }
  item:any;
  id:any;
  ngOnInit():void{
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    this.api.getoneitem(this.id).subscribe((data)=>{
      this.item=data
      console.log(this.item)
      this.editform=this.fb.group({
        "id":this.item.id,
        "name":this.item.name,
        "course":this.item.course,
        "project":this.item.project,
        "batch":this.item.batch,
        "status":this.item.status,
        "placement":this.item.placement
      })
    })
  }
  onsubmit(){
    console.log(this.editform.value)
    this.api.editstud(this.editform.value,this.id).subscribe(data=>{
      console.log(data)
      this.router.navigate(['viewstuds'])
      alert("Detail updated")
    })
  }
}
