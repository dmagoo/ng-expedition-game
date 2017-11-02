import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostCitiesPlayedCardsComponent } from './lost-cities-played-cards.component';

describe('LostCitiesPlayedCardsComponent', () => {
  let component: LostCitiesPlayedCardsComponent;
  let fixture: ComponentFixture<LostCitiesPlayedCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostCitiesPlayedCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostCitiesPlayedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
