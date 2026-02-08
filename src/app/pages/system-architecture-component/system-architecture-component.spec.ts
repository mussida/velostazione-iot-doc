import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemArchitectureComponent } from './system-architecture-component';

describe('SystemArchitectureComponent', () => {
  let component: SystemArchitectureComponent;
  let fixture: ComponentFixture<SystemArchitectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemArchitectureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemArchitectureComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
