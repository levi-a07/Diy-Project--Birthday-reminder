import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../Service/employee.service';
import { WishService } from '../Service/wish.service';
import { IWish } from '../user-event/Wish';
import { IEmployee } from './Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,OnDestroy{
  birthday!: Date;
  remdays: number = 0;
  empData!: IEmployee;
  upcomingBday!: Date;
  daysleft: number = 150;
  age: number = 0;
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
id:number;
emp_subscription:any;
  constructor(private route: ActivatedRoute,
    private empService: EmployeeService,
    private wishService: WishService,
    private router: Router) {

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }



  onsubmit(form: NgForm, emp_id: Number): void {
    let message = form.value.wish;

    this.wishForm.reciever.emp_id = emp_id;

    this.wishForm.sender.emp_id = Number(localStorage.getItem("emp_id"));
    this.wishForm.wish_text = message;


    console.log(message);
    console.log("wish \ |/");

    console.log(this.wishForm);



    this.wishService.sendWish(this.wishForm).subscribe((data) => {
      console.log("sent msg")
    })


    form.reset();
  }


  ngOnChanges(changes: SimpleChanges) : void { window.location.reload();

  }

ngOnInit(): void {
  
  this.id = this.route.snapshot.params['id'];

  this.emp_subscription=this.empService.getEmployeeById(this.id).subscribe((data) => {

    this.empData = data;
    console.log("object emp");

    this.birthday = new Date(this.empData.dob);
    console.log(typeof this.birthday);

    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    this.upcomingBday = this.empService.upcomingBirthday(this.birthday);
    //this.upcomingBday = new Date(today.getFullYear(), this.birthday.getMonth(), this.birthday.getDate());
console.log(this.upcomingBday.getDate());
console.log(today.getDate());

console.log(today.getDate() - this.upcomingBday.getDate());




    console.log(this.empData);


    if (today > this.upcomingBday) {
      this.upcomingBday.setFullYear(today.getFullYear() + 1);
    }

   
    this.remdays = Math.ceil((this.upcomingBday.getTime() - today.getTime()) / oneDay);
 
    this.age = this.upcomingBday.getFullYear() - this.birthday.getFullYear();


  }
  )





}

ngOnDestroy() {
  if (this.emp_subscription) {
    this.emp_subscription.unsubscribe();
  }

}
}
