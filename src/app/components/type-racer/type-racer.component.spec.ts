import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRacerComponent } from './type-racer.component';

describe('TypeRacerComponent', () => {
  let component: TypeRacerComponent;
  let fixture: ComponentFixture<TypeRacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
