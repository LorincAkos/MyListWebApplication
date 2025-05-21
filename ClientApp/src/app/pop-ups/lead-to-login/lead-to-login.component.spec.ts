import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadToLoginComponent } from './lead-to-login.component';

describe('LeadToLoginComponent', () => {
  let component: LeadToLoginComponent;
  let fixture: ComponentFixture<LeadToLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadToLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadToLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
