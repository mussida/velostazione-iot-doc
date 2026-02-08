import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsAnalysisComponent } from './requirements-analysis-component';

describe('RequirementsAnalysisComponent', () => {
  let component: RequirementsAnalysisComponent;
  let fixture: ComponentFixture<RequirementsAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementsAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementsAnalysisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
