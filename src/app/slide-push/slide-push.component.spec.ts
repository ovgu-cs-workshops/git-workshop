import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidePushComponent } from './slide-push.component';

describe('SlidePushComponent', () => {
  let component: SlidePushComponent;
  let fixture: ComponentFixture<SlidePushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidePushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidePushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
