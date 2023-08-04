import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './components/sidenav/home.component';
import { NavbarComponent } from './pages/landingpage/navbar.component';
import { ViewuserComponent } from './pages/users/viewuser/viewuser.component';
import { AdduserComponent } from './pages/users/adduser/adduser.component';
import { ViewstudentsComponent } from './pages/students/viewstudents/viewstudents.component';
import { AddstudentsComponent } from './pages/students/addstudents/addstudents.component';
import { ErrorComponent } from './pages/error/error.component';
import { ChangepassComponent } from './pages/addnotification/changepass.component';
import { EditUserComponent } from './pages/users/edituser/edituser.component';
import { EditstudentComponent } from './pages/students/editstudent/editstudent.component';
import { CsvComponent } from './pages/csv/csv.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewmessageComponent } from './pages/viewmessage/viewmessage.component';
import { HomedataComponent } from './pages/homedata/homedata.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: NavbarComponent },
  { path: 'home', component: HomeComponent },

  { path: 'viewuser', component: ViewuserComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'edituser/:id', component: EditUserComponent },

  { path: 'viewstuds', component: ViewstudentsComponent },
  { path: 'addstuds', component: AddstudentsComponent },
  { path: 'editstuds/:id', component: EditstudentComponent }, // Add ':id' parameter for student ID
 
  { path: 'passchange', component: ChangepassComponent },
  { path: 'csv', component: CsvComponent },
  { path: 'homecomp', component: HomedataComponent },
 
  { path: '**', component: ErrorComponent },

  

  // Other routes for your application
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
