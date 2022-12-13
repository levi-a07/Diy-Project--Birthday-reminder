import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { RegisterComponent } from './register.component';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[    FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
            MatInputModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule
          ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should have form element with form',()=>{
    const el=fixture.debugElement.query(By.css('form'));
    expect(el).toBeTruthy();


  })
  it('should have call login page on click',()=>{
    const fnc=spyOn(component,'login');
    const el =fixture.debugElement.query(By.css('form .loginbtn'));
    el.triggerEventHandler('click',null);
    expect(fnc).toHaveBeenCalled();
    


  })
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
