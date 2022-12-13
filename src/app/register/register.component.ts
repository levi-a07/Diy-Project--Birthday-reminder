import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { EmployeeService } from '../Service/employee.service';

import * as moment from 'moment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  showPassword: Boolean = false;

  postError: boolean = false;
  postErrorMessage: any = "";

  constructor(private empService: EmployeeService, private formBuilder: FormBuilder, private router: Router) { }

  onHttpError(errorResponse: any) {
    console.log('erroe =>>>>>', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({

      emp_id: [, [Validators.required]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")]],

      emp_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      team_id: [0, [Validators.required]],
      dob: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }


  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment({ year: this.year - 100, month: this.month, day: this.day }).format('YYYY-MM-DD');

  maxDate = moment({ year: this.year - 18, month: this.month, day: this.day }).format('YYYY-MM-DD');

  onSubmit(form: FormGroup) {
    console.log(form.valid);

    if (form.valid) {
      const md5 = new Md5();

      console.log(form.value)

      form.value.password = Md5.hashStr(form.value.password).toString();
      
      this.empService.saveEmployee(form.value).subscribe(
        result => {
          if (result) {
            console.log("registered")
            console.log(form.value.role);
            localStorage.setItem('username', form.value.emp_name);

            localStorage.setItem('emp_id', form.value.emp_id);
            localStorage.setItem('team_id', form.value.team_id);
            localStorage.setItem('role', form.value.role);
            this.router.navigate(['']);
          } else {
            form.reset();
            window.alert("Entered Employee ID already exists");

          }


        },
        error => {
          this.onHttpError(error);
          console.log(error.message);
        }

      );
    }
    else {
      this.postError = true;
      this.postErrorMessage = "please fix above error";
    }
  }
  login() {
    this.router.navigate(['/login']);

  }

}
