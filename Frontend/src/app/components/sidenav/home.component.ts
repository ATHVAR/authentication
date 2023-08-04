import { Component, OnInit , ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService, UserRole } from 'src/app/shared/authservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  

  isSidebarActive = false; // Add this property to control sidebar visibility
  @ViewChild('sidebar')
  sidebar!: ElementRef;
  dropdownStates: { [key: string]: boolean } = {}

  collapsed = false;
  isHomeActive:boolean=false;
  isAddUserActive: boolean = false;
  isViewUserActive :boolean = false;
  isAddStudentActive : boolean = false;
  isEditStudentActive : boolean = false;
  isCsvActive : boolean = false;
  isAddNotification:boolean=false;
  

  constructor(private router:Router, private renderer: Renderer2,private authService:AuthserviceService){}

  ngOnInit(): void {
    
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  logout(){
    // after implementing tokenization
    // localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive; // Toggle the sidebar visibility
    if (this.isSidebarActive) {
      this.renderer.addClass(this.sidebar.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'active');
    }
    // if (this.isSidebarActive) {
    //   this.isAddUserActive = true; // Hide AddUser when sidebar is toggled
    // }

  }

  loadAddUser(): void {
    this.isHomeActive =false;
    this.isAddUserActive = true;
    this.isSidebarActive = true; // Close sidebar when AddUser is loaded
    this.isViewUserActive=false;
    this.isAddStudentActive=false;
    this.isEditStudentActive = false;
    this.isCsvActive  = false;
    this.isAddNotification=false;
  }
  
  loadViewUser(): void {
    this.isViewUserActive=true;
    this.isSidebarActive=true;
    this.isAddUserActive=false;
    this.isAddStudentActive=false;
    this.isEditStudentActive=false;
    this.isCsvActive  = false;
    this.isHomeActive =false;
    this.isAddNotification=false;
  }

  loadAddStudent(): void {
    this.isAddStudentActive=true;
    this.isSidebarActive=true;
    this.isAddUserActive=false;
    this.isViewUserActive=false;
    this.isEditStudentActive=false;
    this.isCsvActive = false;
    this.isHomeActive =false;
    this.isAddNotification=false;
    
  }

  loadEditStudent(): void {
    this.isEditStudentActive=true;
    this.isSidebarActive= true;
    this.isAddStudentActive=false;
    this.isAddUserActive=false;
    this.isViewUserActive=false;
    this.isCsvActive=false;
    this.isHomeActive =false;
    this.isAddNotification=false;
  }

  loadCsv() : void {
    this.isCsvActive=true;
    this.isSidebarActive=true;
    this.isAddStudentActive=false;
    this.isAddUserActive=false;
    this.isEditStudentActive=false;
    this.isViewUserActive=false;
    this.isHomeActive =false;
    this.isAddNotification=false;
  }

  loadHomeComp():void{
    this.isAddNotification=false;
    this.isHomeActive =true;
    this.isAddUserActive = false;
    this.isSidebarActive = false;
    this.isViewUserActive=false;
    this.isAddStudentActive=false;
    this.isEditStudentActive = false;
    this.isCsvActive  = false;
  }

  loadNotification():void{
    this.isAddNotification=true;
    this.isHomeActive =false;
    this.isAddUserActive = false;
    this.isSidebarActive = true;
    this.isViewUserActive=false;
    this.isAddStudentActive=false;
    this.isEditStudentActive = false;
    this.isCsvActive  = false;
  }

  toggleDropdown(submenuId: string): void {
    const submenu = document.getElementById(submenuId);
    if (submenu) {
      submenu.classList.toggle('show');
    }
  }


  isAdminRole(): boolean {
    const userRole = localStorage.getItem('userRole');
    return userRole === UserRole.Admin;
  }
}