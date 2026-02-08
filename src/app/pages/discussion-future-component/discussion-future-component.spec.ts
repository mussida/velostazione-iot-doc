import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionFutureComponent } from './discussion-future-component';

describe('DiscussionFutureComponent', () => {
  let component: DiscussionFutureComponent;
  let fixture: ComponentFixture<DiscussionFutureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionFutureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionFutureComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
