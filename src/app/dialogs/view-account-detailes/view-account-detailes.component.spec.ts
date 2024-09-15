import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccountDetailesComponent } from './view-account-detailes.component';

describe('ViewAccountDetailesComponent', () => {
  let component: ViewAccountDetailesComponent;
  let fixture: ComponentFixture<ViewAccountDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAccountDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAccountDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
