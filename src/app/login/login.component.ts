import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { EmployeeService } from '../Service/employee.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm !: FormGroup;
  showPassword: Boolean = false;

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      emp_id: [, [Validators.required]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")]],
    });

  }




  constructor(private empService: EmployeeService, private formBuilder: FormBuilder, private router: Router) { }

  onSubmit(form: FormGroup) {
    console.log("valid form check", form.valid);
    if (form.valid) {
      const md5 = new Md5();

      console.log(form.value.password);

      form.value.password = Md5.hashStr(form.value.password).toString();

      console.log(form.value.password);

      this.empService.userLogin(form.value).subscribe(
        response => {
          console.log("login success---role--->", response);
          if (response !== null) {
            if (response.role === "admin" || response.role.length > 0) {


              this.router.navigate([''])
              // this.empService.isloggedIn = this.empService.isUserLoggedIn();
              // this.empService.isstaff = this.empService.isStaff();

              localStorage.setItem('role', response.role);
              localStorage.setItem('emp_id', String(form.value.emp_id));

              localStorage.setItem('username', response.emp_name);
              localStorage.setItem('team_id', String(response.team_id));


            }
          }
          else {
            window.alert("invalid credentials");
            console.log("invalid credentials")
          }
        },
        err => {
          window.alert("invalid credentials");
          console.log(err.message);
        })
    }

  }
  register() {
    this.router.navigate(['/register']);

  }



}
