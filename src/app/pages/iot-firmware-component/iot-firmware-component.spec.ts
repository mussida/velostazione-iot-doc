import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotFirmwareComponent } from './iot-firmware-component';

describe('IotFirmwareComponent', () => {
  let component: IotFirmwareComponent;
  let fixture: ComponentFixture<IotFirmwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotFirmwareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IotFirmwareComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
