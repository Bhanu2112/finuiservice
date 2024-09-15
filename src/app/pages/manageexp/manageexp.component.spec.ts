import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageexpComponent } from './manageexp.component';

describe('ManageexpComponent', () => {
  let component: ManageexpComponent;
  let fixture: ComponentFixture<ManageexpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageexpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
