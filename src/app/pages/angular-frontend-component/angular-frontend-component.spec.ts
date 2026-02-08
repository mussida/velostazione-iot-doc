import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFrontendComponent } from './angular-frontend-component';

describe('AngularFrontendComponent', () => {
  let component: AngularFrontendComponent;
  let fixture: ComponentFixture<AngularFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFrontendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularFrontendComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
