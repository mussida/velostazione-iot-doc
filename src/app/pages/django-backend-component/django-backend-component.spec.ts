import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DjangoBackendComponent } from './django-backend-component';

describe('DjangoBackendComponent', () => {
  let component: DjangoBackendComponent;
  let fixture: ComponentFixture<DjangoBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DjangoBackendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DjangoBackendComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
