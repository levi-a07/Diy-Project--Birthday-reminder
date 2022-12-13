import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';
import { IEmployee } from '../employee/Employee';
import { EmployeeService } from '../Service/employee.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('empSearchInput', { static: true }) empSearchInput: ElementRef;
  @Output() setEmpNameEvent = new EventEmitter<{ name: string }>();

  emps: IEmployee[] = [];
  showSearches: boolean = false;
  isSearching: boolean = false;
  searchedEmps: any = [];
  searchStr: String = '';
  empSub: any;
  constructor(private empService: EmployeeService, private router: Router) {
    this.empSub = empService.getAllEmployees().subscribe((data) => {
      this.emps = data;
    })
    this.searchedEmps = this.emps;


  }
  ngOnDestroy(): void {
    this.empSub.unsubscribe();
  }
  search(event: any, id: number) {

    this.router.navigate(['/employee/' + id]);
    this.empSearchInput.nativeElement.value = '';
  }
  ngOnInit() {
    this.empSearch();
  }

  getEmps(name: string): Observable<any> {

    return of(this.filterEmps(name))
  }

  filterEmps(name: string) {

    return this.emps.filter((emp: IEmployee) =>
      emp.emp_name.toLocaleLowerCase().includes(name.toLowerCase()) == true);

    //return this.emps.filter((val) => val.toLowerCase().includes(name.toLowerCase()) == true)
  }

  empSearch() {
    const search$ = fromEvent(this.empSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap((term) => term ? this.getEmps(term) : of<any>(this.emps)),
      tap(() => {
        this.isSearching = false,
          this.showSearches = true;
      }));

    search$.subscribe(data => {
      this.isSearching = false
      this.searchedEmps = data;
    },(err : HttpErrorResponse)=>{
      window.alert("search failed");
      console.log(err.message);
    });
  }

  setEmpname(name: string) {
    this.searchedEmps = this.filterEmps(name);
    this.setEmpNameEvent.emit({ name });
    this.empSearchInput.nativeElement.value = name;
    this.showSearches = false;
  }

  trackById(index: any, item: IEmployee): String {
    return item.emp_name;
  }

}