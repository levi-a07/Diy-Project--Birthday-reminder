import { TestBed } from '@angular/core/testing';
import {   HttpTestingController,HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  
  let httpMock: HttpTestingController;
  let empService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[EmployeeService]
    });

    empService = TestBed.get(EmployeeService);
    httpMock=TestBed.get(HttpTestingController);
  });
  it('getAllEmployees() should be GET employees', () => {
    
    
    expect(empService).toBeTruthy();
  });


  it('should be created', () => {
    expect(empService).toBeTruthy();
  });
});
