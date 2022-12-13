import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from '../employee/Employee';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(emps: IEmployee[],searchBy:string): any[] {
    if (!emps) {
      return [];
    }
    if (!searchBy) {
      return emps;
    }
    searchBy = searchBy.toLocaleLowerCase();

    return emps.filter((emp:IEmployee)=>
                        emp.emp_name.toLocaleLowerCase().includes(searchBy));
  
  }

}
