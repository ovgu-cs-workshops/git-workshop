import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideReadmeComponent } from './slide-readme.component';

describe('SlideReadmeComponent', () => {
  let component: SlideReadmeComponent;
  let fixture: ComponentFixture<SlideReadmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideReadmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideReadmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
