import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndToEndWorkflowComponent } from './end-to-end-workflow-component';

describe('EndToEndWorkflowComponent', () => {
  let component: EndToEndWorkflowComponent;
  let fixture: ComponentFixture<EndToEndWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndToEndWorkflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndToEndWorkflowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
