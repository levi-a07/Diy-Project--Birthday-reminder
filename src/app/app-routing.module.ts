import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmpTeamComponent } from './edit-emp-team/edit-emp-team.component';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoggedInAuthGuard } from './Guards/logged-in-auth.guard';
import { RoleGuard } from './Guards/role.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserEventComponent } from './user-event/user-event.component';

const routes: Routes = [
  
  { path: '', component: UserEventComponent ,canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent,canActivate:[LoggedInAuthGuard] },
  
  { path: 'login', component: LoginComponent,canActivate:[LoggedInAuthGuard] },

  { path: 'employee', component: EmployeeComponent,canActivate:[AuthGuard] },
  { path: 'employee/:id', component: EmployeeComponent,canActivate:[AuthGuard] },
  
  { path: 'allemployees', component: EditEmpTeamComponent,canActivate:[AuthGuard,RoleGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
