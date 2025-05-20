import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeEditComponent } from './anime-edit.component';

describe('AnimeEditComponent', () => {
  let component: AnimeEditComponent;
  let fixture: ComponentFixture<AnimeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
