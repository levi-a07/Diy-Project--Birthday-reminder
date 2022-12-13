import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpTeamComponent } from './edit-emp-team.component';

 describe('EditEmpTeamComponent', () => {
  let component: EditEmpTeamComponent;
  let fixture: ComponentFixture<EditEmpTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmpTeamComponent ],
    
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmpTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
