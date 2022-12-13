import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../employee/Employee';
import { EmployeeService } from '../Service/employee.service';

@Component({
  selector: 'app-edit-emp-team',
  templateUrl: './edit-emp-team.component.html',
  styleUrls: ['./edit-emp-team.component.css']
})
export class EditEmpTeamComponent implements OnInit {

  emps: IEmployee[];
  cur_team_id: number;
  canEditCode: Boolean;

  enableEdit = false;
  enableEditIndex = null;


  constructor(private empService: EmployeeService,private router:Router) { 
    
  }

  ngOnInit(): void {
    this.empService.getAllEmployees().subscribe((data) => {
      this.emps = data;
    
    })


  }

  saveUpdate(team_id:number,emp_id:number){
    this.enableEdit = false;
    this.empService.addEmpToTeam(team_id,emp_id).subscribe((data)=>{
      console.log(data);
    });

  }
  enableEditMethod(i:any) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  
  }



  send(team_id: any, emp_id: any) {

    this.canEditCode = false;
console.log(team_id,emp_id);

    this.empService.addEmpToTeam(team_id, emp_id).subscribe((data) => {
      return data;
    },err => {
      window.alert("invalid failed to add to team"+team_id);
      console.log(err.message);
    }
    )
  }



}
