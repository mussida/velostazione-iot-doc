import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduzione } from './introduzione';

describe('Introduzione', () => {
  let component: Introduzione;
  let fixture: ComponentFixture<Introduzione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Introduzione]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Introduzione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
