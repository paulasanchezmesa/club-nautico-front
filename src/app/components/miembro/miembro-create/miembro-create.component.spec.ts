import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroCreateComponent } from './miembro-create.component';

describe('MiembroCreateComponent', () => {
  let component: MiembroCreateComponent;
  let fixture: ComponentFixture<MiembroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiembroCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiembroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
