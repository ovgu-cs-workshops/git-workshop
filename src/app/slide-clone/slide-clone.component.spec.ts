import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCloneComponent } from './slide-clone.component';

describe('SlideCloneComponent', () => {
  let component: SlideCloneComponent;
  let fixture: ComponentFixture<SlideCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
