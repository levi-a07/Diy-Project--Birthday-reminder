import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEmployee } from '../employee/Employee';
import { Observable } from 'rxjs';
import { userInfo } from '../login/userInfo';
import { IloginUser } from '../login/loginUser';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 

  upcomingBirthday(birthday: Date) {
    let today = new Date();
    return new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

  }



  constructor(private http: HttpClient) { }




  saveEmployee(emp: IEmployee): Observable<Boolean> {
    return this.http.post<Boolean>("http://localhost:8080/register", emp);
  }

  userLogin(emp: IloginUser): Observable<userInfo> {
    return this.http.post<userInfo>("http://localhost:8080/login", emp);

  }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:8080/admin/');
  }

  getAllEmployeesByDate(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:8080/empBydate/');
  }


  getEmployeeById(id: Number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`http://localhost:8080/emp/${id}`);
  }

  getEmployeesByMonth(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:8080/');
  }



  addEmpToTeam(team_id: number, emp_id: number): Observable<Boolean> {

  const jsonEmp={
    "team_id":team_id,
    "emp_id":emp_id
}
   return this.http.put<Boolean>('http://localhost:8080/adminedit',jsonEmp);

  }


  deleteEmployee(emp_id: any) {
    
    return this.http.delete<Boolean>(`http://localhost:8080/admin/${emp_id}`)

  }

}
