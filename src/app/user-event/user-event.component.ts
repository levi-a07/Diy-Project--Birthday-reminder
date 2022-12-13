
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IEmployee } from '../employee/Employee';
import { EmployeeService } from '../Service/employee.service';
import { WishService } from '../Service/wish.service';
import { IWish } from './Wish';


@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent implements OnInit {

  wishForm: IWish = {
    wish_text: "",

    sender: {
      emp_id: 0,
      password: ""
    },
    reciever: {
      emp_id: 0,
      password: ""
    },
    wish_id: 0
  }



  wish_act!: Boolean[];

  @ViewChild('wish') wish!: ElementRef;
  empData!: IEmployee;
  currentUser: string = '';

  bdayEmployees!: IEmployee[];
  private _filterBy: string = '';



  filteredEmployee: IEmployee[] = [];
  BEmployees: IEmployee[] = [];
  bdayEmp: String = '';
 




  constructor(
    private empService: EmployeeService,
    private wishService: WishService,
   ) {

    this.empService.getAllEmployeesByDate().subscribe((response) => {
      console.log(response);

      this.BEmployees = response;

      for (let i = 0; i < this.BEmployees.length; i++) {
        console.log(this.BEmployees[i].emp_name);

        this.bdayEmp = this.BEmployees[i].emp_name + " ," + this.bdayEmp;

      }
    }, err => {
      window.alert("failed to load employees by date");
      console.log(err.message);
    })


  }

  performFilter(filterBy: string): IEmployee[] {

    filterBy = filterBy.toLocaleLowerCase();
    return this.bdayEmployees.filter((emp: IEmployee) =>
      emp.emp_name.toLocaleLowerCase().includes(filterBy));

  }
  ngOnInit() {

    const userName = String(localStorage.getItem('username') || '');
    this.currentUser = userName.charAt(0).toUpperCase() + userName.slice(1);
    this.empService.getAllEmployees().pipe(
      map(events => events.sort((a: IEmployee,b:IEmployee) =>
    //   {
    //     const oneDay = 24 * 60 * 60 * 1000;
    // let remdays = - Math.ceil(new Date(this.upcomingBday(a.dob)).getTime() - new Date().getTime() / oneDay);
    // let remdays2 = -Math.ceil(new Date(this.upcomingBday(b.dob)).getTime() - new Date().getTime() / oneDay);
    // return - remdays-remdays2;

    //   }
    (new Date(this.upcomingBday(a.dob)).getTime() - new Date(this.upcomingBday(b.dob)).getTime())
      
  //  (new Date(this.upcomingBday(a.dob)).getTime() - new Date(this.upcomingBday(b.dob)).getTime())
      // - (new Date(this.upcomingBday(b.dob)).getTime() - new Date().getTime())

      // (new Date(this.upcomingBday(b.dob)).getUTCDate()-new Date().getUTCDate())-
      // ( new Date(this.upcomingBday(a.dob)).getUTCDate() -new Date().getUTCDate())
        )
        )
    ).subscribe((data) => {


      this.bdayEmployees = data;
      this.filteredEmployee = this.bdayEmployees;

    },err => {
      window.alert("failed to load all employees ");
      console.log(err.message);
    })

    this.filteredEmployee = this.bdayEmployees;






    console.log(this.bdayEmp);


  }

  upcomingBday(dob: Date): Date {
    dob = new Date(dob);
    const today = new Date();
    const upcoming=new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today > upcoming) {
      upcoming.setFullYear(today.getFullYear() + 1);
    }
    return upcoming

  }
  daysleft(dob: Date): number {
    let birthday = new Date(dob);


    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    let upcomingBday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());


    if (today > upcomingBday) {
      upcomingBday.setFullYear(today.getFullYear() + 1);
    }

    let remdays = Math.ceil((upcomingBday.getTime() - today.getTime()) / oneDay);
    if(birthday.getDate()==today.getDate() && (birthday.getMonth()==today.getMonth())) {
      remdays=0;
      
    }
    return remdays;

  }

  age(dob: Date): number {
    let birthday = new Date(dob);


    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    let upcomingBday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());


    if (today > upcomingBday) {
      upcomingBday.setFullYear(today.getFullYear() + 1);
    }

    let age = upcomingBday.getFullYear() - birthday.getFullYear();
    return age;
  }



  toggle(e: HTMLElement) {
    if ((e.classList.contains('message-box'))) {

      e.classList.remove('message-box');
      e.classList.add('hidden')

    } else {
      e.classList.add('message-box');
      e.classList.remove('hidden')
    }
  }

  onsubmit(form: NgForm, emp_id: Number): void {

    let message = form.value.wish;

    this.wishForm.reciever.emp_id = emp_id;

    this.wishForm.sender.emp_id = Number(localStorage.getItem("emp_id"));
    this.wishForm.wish_text = message;


    console.log(message);
    console.log("wish \|/");

    console.log(this.wishForm);



    this.wishService.sendWish(this.wishForm).subscribe((data) => {
      console.log("sent msg")
    })


    form.reset();
  }
}

