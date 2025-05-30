import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInfoComponent } from './cart-info.component';

describe('CartInfoComponent', () => {
  let component: CartInfoComponent;
  let fixture: ComponentFixture<CartInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
