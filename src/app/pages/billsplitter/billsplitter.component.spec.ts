import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsplitterComponent } from './billsplitter.component';

describe('BillsplitterComponent', () => {
  let component: BillsplitterComponent;
  let fixture: ComponentFixture<BillsplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsplitterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
