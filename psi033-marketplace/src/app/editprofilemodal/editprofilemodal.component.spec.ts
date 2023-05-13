import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilemodalComponent } from './editprofilemodal.component';

describe('EditprofilemodalComponent', () => {
  let component: EditprofilemodalComponent;
  let fixture: ComponentFixture<EditprofilemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprofilemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofilemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
