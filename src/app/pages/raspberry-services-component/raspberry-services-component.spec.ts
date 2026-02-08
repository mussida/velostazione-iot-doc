import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspberryServicesComponent } from './raspberry-services-component';

describe('RaspberryServicesComponent', () => {
  let component: RaspberryServicesComponent;
  let fixture: ComponentFixture<RaspberryServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaspberryServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaspberryServicesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
