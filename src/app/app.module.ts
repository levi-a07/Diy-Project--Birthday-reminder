import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { RegisterComponent } from './register/register.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UserEventComponent } from './user-event/user-event.component';
import { EditEmpTeamComponent } from './edit-emp-team/edit-emp-team.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    UserEventComponent,
    RegisterComponent,
    EmployeeComponent,
    LoginComponent,
    FilterPipe,
    SearchBarComponent
    , EditEmpTeamComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
