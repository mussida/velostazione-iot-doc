import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareDesignComponent } from './hardware-design-component';

describe('HardwareDesignComponent', () => {
  let component: HardwareDesignComponent;
  let fixture: ComponentFixture<HardwareDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwareDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareDesignComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
