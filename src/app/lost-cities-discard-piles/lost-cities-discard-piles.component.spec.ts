import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostCitiesDiscardPilesComponent } from './lost-cities-discard-piles.component';

describe('LostCitiesDiscardPilesComponent', () => {
  let component: LostCitiesDiscardPilesComponent;
  let fixture: ComponentFixture<LostCitiesDiscardPilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostCitiesDiscardPilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostCitiesDiscardPilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
