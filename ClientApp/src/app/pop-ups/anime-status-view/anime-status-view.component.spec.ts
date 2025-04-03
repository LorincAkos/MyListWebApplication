import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeStatusViewComponent } from './anime-status-view.component';

describe('AnimeStatusViewComponent', () => {
  let component: AnimeStatusViewComponent;
  let fixture: ComponentFixture<AnimeStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeStatusViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
