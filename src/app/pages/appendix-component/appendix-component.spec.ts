import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendixComponent } from './appendix-component';

describe('AppendixComponent', () => {
  let component: AppendixComponent;
  let fixture: ComponentFixture<AppendixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppendixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppendixComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
