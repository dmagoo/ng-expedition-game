import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostCitiesCardComponent } from './lost-cities-card.component';

describe('LostCitiesCardComponent', () => {
  let component: LostCitiesCardComponent;
  let fixture: ComponentFixture<LostCitiesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostCitiesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostCitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
