import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostCitiesHandComponent } from './lost-cities-hand.component';

describe('LostCitiesHandComponent', () => {
  let component: LostCitiesHandComponent;
  let fixture: ComponentFixture<LostCitiesHandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostCitiesHandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostCitiesHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
